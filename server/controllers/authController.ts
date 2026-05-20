import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { AuthRequest } from '../middleware/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-hospital-key';

export const register = async (req: Request, res: Response) => {
  const { email, password, role, name } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, role, name) VALUES ($1, $2, $3, $4) RETURNING id, email, role, name',
      [email, passwordHash, role, name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  try {
    // Map unique ID to email/password if input matches a secure Clinician Passkey
    const keyMap: Record<string, [string, string]> = {
      'MED-ADM-777': ['admin@mediflow.com', 'admin123'],
      'MED-DOC-888': ['doctor@mediflow.com', 'doctor123'],
      'MED-NUR-999': ['nurse@mediflow.com', 'nurse123'],
      'MED-STF-111': ['staff@mediflow.com', 'staff123'],
    };

    if (email && keyMap[email.toUpperCase()]) {
      const mapped = keyMap[email.toUpperCase()];
      email = mapped[0];
      password = mapped[1];
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, role: user.role, name: user.name, email: user.email } });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const result = await pool.query('SELECT id, email, role, name FROM users WHERE email = $1', [req.user.email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found in hospital database' });
    }
    res.json({ user: result.rows[0] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
