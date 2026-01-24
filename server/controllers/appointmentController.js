const db = require('../config/db');

// Appointments
exports.getAppointments = async (req, res) => {
  const { date } = req.query;
  try {
    const { rows } = await db.query(`
      SELECT a.*, p.name as patient_name, d.specialty, u.full_name as doctor_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN doctors d ON a.doctor_id = d.id
      JOIN users u ON d.user_id = u.id
      WHERE a.appointment_date = $1
    `, [date]);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.bookAppointment = async (req, res) => {
  const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time) VALUES ($1, $2, $3, $4) RETURNING *',
      [patient_id, doctor_id, appointment_date, appointment_time]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ message: 'Time slot already booked' });
    res.status(500).json({ error: err.message });
  }
};

// ICU
exports.getICUPatients = async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT i.*, p.name as patient_name, a.current_condition
      FROM icu_patients i
      JOIN admissions a ON i.admission_id = a.id
      JOIN patients p ON a.patient_id = p.id
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateICUMetrics = async (req, res) => {
  const { id } = req.params;
  const { critical_metrics, status_flag } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE icu_patients SET critical_metrics = $1, status_flag = $2, last_updated = NOW() WHERE id = $3 RETURNING *',
      [critical_metrics, status_flag, id]
    );
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Diet
exports.getDietPlans = async (req, res) => {
  const { date } = req.query;
  try {
    const { rows } = await db.query(`
      SELECT d.*, p.name as patient_name
      FROM diet_plans d
      JOIN admissions a ON d.admission_id = a.id
      JOIN patients p ON a.patient_id = p.id
      WHERE d.plan_date = $1
    `, [date || new Date().toISOString().split('T')[0]]);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.addDietPlan = async (req, res) => {
  const { admission_id, menu, instructions, plan_date } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO diet_plans (admission_id, menu, instructions, plan_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [admission_id, menu, instructions, plan_date]
    );
    res.status(201).json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};
