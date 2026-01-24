import { Request, Response } from 'express';
import pool from '../config/db';

export const getICUPatients = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT i.*, p.name as patient_name, a.bed_number, a.condition
      FROM icu_patients i
      JOIN admissions a ON i.admission_id = a.id
      JOIN patients p ON a.patient_id = p.id
      ORDER BY i.last_updated DESC
    `);
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateICUMetrics = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { critical_metrics, status_flag } = req.body;
  try {
    const result = await pool.query(
      'UPDATE icu_patients SET critical_metrics = $1, status_flag = $2, last_updated = NOW() WHERE id = $3 RETURNING *',
      [critical_metrics, status_flag, id]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
