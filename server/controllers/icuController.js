const db = require('../config/db');

exports.getICUPatients = async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT i.*, p.name, a.current_condition
      FROM icu_patients i
      JOIN admissions a ON i.admission_id = a.id
      JOIN patients p ON a.patient_id = p.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
