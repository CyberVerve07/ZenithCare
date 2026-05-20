import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import patientRoutes from './routes/patients';
import appointmentRoutes from './routes/appointments';
import icuRoutes from './routes/icu';
import dietRoutes from './routes/diet';
import adminRoutes from './routes/admin';
import chatRoutes from './routes/chat';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/admissions', patientRoutes); // Alias for compatibility with direct frontend queries
app.use('/api/appointments', appointmentRoutes);
app.use('/api/icu', icuRoutes);
app.use('/api/diet', dietRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);

app.get('/health', (req: Request, res: Response) => res.json({ status: 'healthy' }));

// For local development, listen to port. For Vercel Serverless, export app
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
