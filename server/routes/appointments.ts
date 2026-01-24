import express from 'express';
import { getAppointments, bookAppointment } from '../controllers/appointmentController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getAppointments);
router.post('/book', authenticate, bookAppointment);

export default router;
