import { Request, Response } from 'express';
import pool from '../config/db';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT id, email, role, name, created_at FROM users');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getSystemStats = async (req: Request, res: Response) => {
  try {
    const users = await pool.query('SELECT count(*) FROM users');
    const patients = await pool.query('SELECT count(*) FROM patients');
    const admissions = await pool.query('SELECT count(*) FROM admissions WHERE status = \'admitted\'');
    res.json({
      totalUsers: parseInt(users.rows[0].count),
      totalPatients: parseInt(patients.rows[0].count),
      activeAdmissions: parseInt(admissions.rows[0].count)
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
