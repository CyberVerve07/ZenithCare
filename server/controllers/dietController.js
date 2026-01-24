const db = require('../config/db');

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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDietPlan = async (req, res) => {
  const { admission_id, menu, instructions, plan_date } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO diet_plans (admission_id, menu, instructions, plan_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [admission_id, menu, instructions, plan_date]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
