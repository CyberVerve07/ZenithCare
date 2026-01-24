import { Request, Response } from 'express';
import pool from '../config/db';

export const getDietPlans = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT d.*, p.name as patient_name
      FROM diet_plans d
      JOIN patients p ON d.patient_id = p.id
    `);
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDietPlan = async (req: Request, res: Response) => {
  const { patient_id, breakfast, lunch, dinner, instructions } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO diet_plans (patient_id, breakfast, lunch, dinner, instructions) 
       VALUES ($1, $2, $3, $4, $5) 
       ON CONFLICT (patient_id) DO UPDATE 
       SET breakfast = $2, lunch = $3, dinner = $4, instructions = $5 RETURNING *`,
      [patient_id, breakfast, lunch, dinner, instructions]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
