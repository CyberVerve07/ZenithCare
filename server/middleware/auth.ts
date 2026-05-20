import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as admin from 'firebase-admin';
import pool from '../config/db';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-hospital-key';

// Initialize Firebase Admin SDK conditionally if env keys exist
if (process.env.FIREBASE_PROJECT_ID && !admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      })
    });
    console.log('[Firebase Admin] Conditionally initialized successfully.');
  } catch (err: any) {
    console.error('[Firebase Admin Initialization Failed]:', err.message);
  }
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    email: string;
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  // 1. If it looks like a Firebase token or env is configured, attempt Firebase Admin verification
  if (token.length > 250 || process.env.FIREBASE_PROJECT_ID) {
    try {
      if (admin.apps.length > 0) {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const email = decodedToken.email;
        
        // Sync or look up user inside PostgreSQL
        let dbResult = await pool.query('SELECT id, role, email, name FROM users WHERE email = $1', [email]);
        
        if (dbResult.rows.length === 0) {
          // Auto-signup: Google / Firebase validated profiles automatically register in Postgres with a default role
          const defaultRole = email?.endsWith('@mediflow.com') ? 'Doctor' : 'Staff';
          const name = decodedToken.name || 'Hospital Member';
          
          dbResult = await pool.query(
            'INSERT INTO users (email, password_hash, role, name) VALUES ($1, $2, $3, $4) RETURNING id, role, email, name',
            [email, 'oauth-managed-password', defaultRole, name]
          );
          console.log(`[Firebase Auto-Signup] Successfully registered new OAuth user: ${email} with role ${defaultRole}`);
        }
        
        const dbUser = dbResult.rows[0];
        req.user = {
          id: dbUser.id,
          role: dbUser.role,
          email: dbUser.email
        };
        return next();
      }
    } catch (err: any) {
      console.warn('[Firebase Auth fallback to local JWT]:', err.message);
      // Fall through to standard JWT check if verification failed (e.g. it was a local demo token)
    }
  }

  // 2. Fallback to Local PostgreSQL JWT verification
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const optionalAuthenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next();

  // 1. If it looks like a Firebase token or env is configured, attempt Firebase Admin verification
  if (token.length > 250 || process.env.FIREBASE_PROJECT_ID) {
    try {
      if (admin.apps.length > 0) {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const email = decodedToken.email;
        
        // Sync or look up user inside PostgreSQL
        let dbResult = await pool.query('SELECT id, role, email, name FROM users WHERE email = $1', [email]);
        
        if (dbResult.rows.length === 0) {
          // Auto-signup: Google / Firebase validated profiles automatically register in Postgres with a default role
          const defaultRole = email?.endsWith('@mediflow.com') ? 'Doctor' : 'Staff';
          const name = decodedToken.name || 'Hospital Member';
          
          dbResult = await pool.query(
            'INSERT INTO users (email, password_hash, role, name) VALUES ($1, $2, $3, $4) RETURNING id, role, email, name',
            [email, 'oauth-managed-password', defaultRole, name]
          );
          console.log(`[Firebase Auto-Signup] Successfully registered new OAuth user: ${email} with role ${defaultRole}`);
        }
        
        const dbUser = dbResult.rows[0];
        req.user = {
          id: dbUser.id,
          role: dbUser.role,
          email: dbUser.email
        };
        return next();
      }
    } catch (err: any) {
      console.warn('[Firebase Auth optional fallback to local JWT]:', err.message);
      // Fall through to standard JWT check if verification failed (e.g. it was a local demo token)
    }
  }

  // 2. Fallback to Local PostgreSQL JWT verification
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    next();
  }
};

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
