import express from 'express';
import { getAdmissions, admitPatient, updateStatus, generateSummary } from '../controllers/patientController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getAdmissions);
router.post('/admit', authenticate, authorize(['admin', 'doctor']), admitPatient);
router.patch('/:id/status', authenticate, authorize(['doctor', 'nurse']), updateStatus);
router.post('/:id/summary', authenticate, authorize(['doctor']), generateSummary);

export default router;
