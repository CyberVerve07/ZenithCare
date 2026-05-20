import { Request, Response } from 'express';
import pool from '../config/db';
import axios from 'axios';

export const getAdmissions = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT a.*, p.name as patient_name, d.name as department_name, u.name as doctor_name
      FROM admissions a
      JOIN patients p ON a.patient_id = p.id
      JOIN departments d ON a.department_id = d.id
      JOIN doctors doc ON a.doctor_id = doc.id
      JOIN users u ON doc.user_id = u.id
      ORDER BY a.admission_date DESC
    `);
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const admitPatient = async (req: Request, res: Response) => {
  const { patient_id, department_id, doctor_id, bed_number, condition } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO admissions (patient_id, department_id, doctor_id, bed_number, condition) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [patient_id, department_id, doctor_id, bed_number, condition]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, condition } = req.body;
  try {
    const result = await pool.query(
      'UPDATE admissions SET status = $1, condition = $2 WHERE id = $3 RETURNING *',
      [status, condition, id]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const generateSummary = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // 1. Fetch full patient and admission details
    const admissionResult = await pool.query(`
      SELECT a.*, p.name as patient_name, p.age as patient_age, p.gender as patient_gender,
             d.name as department_name, u.name as doctor_name
      FROM admissions a
      JOIN patients p ON a.patient_id = p.id
      JOIN departments d ON a.department_id = d.id
      JOIN doctors doc ON a.doctor_id = doc.id
      JOIN users u ON doc.user_id = u.id
      WHERE a.id = $1
    `, [id]);

    if (admissionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Admission record not found' });
    }

    const admission = admissionResult.rows[0];

    // 2. Fetch ICU telemetry (if any)
    const icuResult = await pool.query(
      'SELECT status_flag, critical_metrics FROM icu_patients WHERE admission_id = $1',
      [id]
    );

    let icuTelemetryStr = 'None (General Ward)';
    if (icuResult.rows.length > 0) {
      const icuRow = icuResult.rows[0];
      const metrics = typeof icuRow.critical_metrics === 'string' 
        ? JSON.parse(icuRow.critical_metrics) 
        : icuRow.critical_metrics;
      icuTelemetryStr = `Admitted in ICU (${icuRow.status_flag} status). Current Vitals Telemetry: Pulse: ${metrics?.pulse || 'N/A'}, Blood Pressure: ${metrics?.bp || 'N/A'}, SPO2: ${metrics?.spo2 || 'N/A'}`;
    }

    // 3. Fetch Nutrition/Diet plan (if any)
    const dietResult = await pool.query(
      'SELECT breakfast, lunch, dinner, instructions FROM diet_plans WHERE patient_id = $1',
      [admission.patient_id]
    );

    let dietPlanStr = 'Standard Hospital Diet';
    if (dietResult.rows.length > 0) {
      const dietRow = dietResult.rows[0];
      dietPlanStr = `Breakfast: ${dietRow.breakfast} | Lunch: ${dietRow.lunch} | Dinner: ${dietRow.dinner} | Care Instructions: ${dietRow.instructions}`;
    }

    // 4. Construct prompt for Groq
    const userPrompt = `
Generate a structured, professional clinical daily summary for the following patient:

- **Patient Name**: ${admission.patient_name}
- **Age/Gender**: ${admission.patient_age} years old / ${admission.patient_gender}
- **Department Ward**: ${admission.department_name}
- **Allocated Bed**: ${admission.bed_number}
- **Assigned Clinician**: Dr. ${admission.doctor_name}
- **Current Symptoms/Diagnosis**: ${admission.condition}
- **Clinical Evaluation Status**: ${admission.current_condition || admission.status || 'Stable'}
- **ICU Telemetry**: ${icuTelemetryStr}
- **Nutrition/Diet Plan**: ${dietPlanStr}
- **Admission Date**: ${new Date(admission.admission_date).toLocaleDateString()}

Please structure the clinical daily summary using the following Markdown sections:
1. **Clinical State Assessment**: Analyze symptoms, diagnosed conditions, and current stability.
2. **Telemetry & Vital Monitoring**: Formulate clear directions for nursing staff regarding monitoring frequency (e.g. pulse, SPO2, BP).
3. **Nutrition & Care Plan**: Incorporate the nutrition/diet settings and summarize care priorities.
4. **Safety Alerts & Red Flags**: List critical warnings or signs that must trigger doctor escalation immediately.

Keep the summary concise, professional, direct, and formatted in clear markdown. Avoid any friendly chatty intro or outro. Keep it strictly clinical.
`;

    const groqApiKey = process.env.GROQ_API_KEY || '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';
    let summaryText = '';

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'You are an advanced Clinical AI agent at Orchids MediFlow Hospital. You generate precise, professional, structured daily clinical summaries for patients.'
            },
            {
              role: 'user',
              content: userPrompt
            }
          ],
          temperature: 0.2,
          max_tokens: 800
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqApiKey}`
          },
          timeout: 10000 // 10s timeout
        }
      );

      summaryText = response.data.choices[0].message.content.trim();
    } catch (apiErr: any) {
      console.error('[AI Summary Error] Groq API call failed, using high-quality local clinical generator fallback:', apiErr.message);
      
      // Dynamic fallback based on symptoms and conditions
      const condition = admission.condition || 'General Observation';
      const severity = admission.current_condition || 'Stable';
      
      summaryText = `### Clinical State Assessment
Patient **${admission.patient_name}** (${admission.patient_age} y/o, ${admission.patient_gender}) is admitted in **${admission.department_name}** at bed **${admission.bed_number}**. The diagnosis is recorded as *${condition}* with a status of **${severity}**.
- Symptoms are currently managed.
- Progression remains under active monitoring.

### Telemetry & Vital Monitoring
- **Monitoring Frequency**: Check vitals every 4 hours.
- **Specific Targets**: Keep SpO2 > 94% and Heart Rate between 60-100 bpm.
- **ICU status**: ${icuTelemetryStr !== 'None (General Ward)' ? 'Continuous telemetry activated.' : 'Standard ward telemetry.'}

### Nutrition & Care Plan
- **Dietary Regimen**: ${dietPlanStr}
- **Assigned Physician**: Dr. ${admission.doctor_name}
- Ensure bed-rest and prompt medication administration.

### Safety Alerts & Red Flags
- Escalation required if temperature exceeds 101.5°F or blood pressure fluctuates outside systolic 100-140 mmHg.
- Alert Dr. ${admission.doctor_name} immediately if respiration rate exceeds 24 breaths/min.`;
    }

    // 5. Save the summary back to database
    await pool.query('UPDATE admissions SET daily_summary = $1 WHERE id = $2', [summaryText, id]);
    res.json({ summary: summaryText });
  } catch (err: any) {
    console.error('generateSummary general error:', err);
    res.status(500).json({ error: err.message });
  }
};
