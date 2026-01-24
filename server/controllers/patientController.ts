import { Request, Response } from 'express';
import pool from '../config/db';

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
    // In a real app, this would call an LLM with patient data
    // For this demo, we'll simulate an AI summary based on latest condition
    const admission = await pool.query('SELECT condition FROM admissions WHERE id = $1', [id]);
    const summary = `AI Summary: Patient is currently ${admission.rows[0].condition}. Stable progression observed. Monitor vitals every 4 hours.`;
    
    await pool.query('UPDATE admissions SET daily_summary = $1 WHERE id = $2', [summary, id]);
    res.json({ summary });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
