const db = require('../config/db');

// Patients & Admissions
exports.getPatients = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM patients ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.admitPatient = async (req, res) => {
  const { patient_id, current_condition } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO admissions (patient_id, current_condition) VALUES ($1, $2) RETURNING *',
      [patient_id, current_condition]
    );
    res.status(201).json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getAdmissions = async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT a.*, p.name as patient_name, p.age, p.gender 
      FROM admissions a 
      JOIN patients p ON a.patient_id = p.id 
      WHERE a.status = 'Admitted'
    `);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Tests & Medicines
exports.addTest = async (req, res) => {
  const { admission_id, test_name } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO patient_tests (admission_id, test_name) VALUES ($1, $2) RETURNING *',
      [admission_id, test_name]
    );
    res.status(201).json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.addMedicine = async (req, res) => {
  const { admission_id, medicine_name, dosage, timing, instructions } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO patient_medicines (admission_id, medicine_name, dosage, timing, instructions) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [admission_id, medicine_name, dosage, timing, instructions]
    );
    res.status(201).json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateCondition = async (req, res) => {
  const { id } = req.params;
  const { current_condition } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE admissions SET current_condition = $1, last_updated = NOW() WHERE id = $2 RETURNING *',
      [current_condition, id]
    );
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
};
