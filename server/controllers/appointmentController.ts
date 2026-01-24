import { Request, Response } from 'express';
import pool from '../config/db';

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT a.*, p.name as patient_name, u.name as doctor_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN doctors d ON a.doctor_id = d.id
      JOIN users u ON d.user_id = u.id
      ORDER BY a.appointment_date ASC
    `);
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const bookAppointment = async (req: Request, res: Response) => {
  const { patient_id, doctor_id, appointment_date } = req.body;
  try {
    // Conflict check (UNIQUE constraint handles it, but we can be explicit)
    const result = await pool.query(
      'INSERT INTO appointments (patient_id, doctor_id, appointment_date) VALUES ($1, $2, $3) RETURNING *',
      [patient_id, doctor_id, appointment_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Doctor already has an appointment at this time' });
    }
    res.status(400).json({ error: err.message });
  }
};
