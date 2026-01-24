import express from 'express';
import { getICUPatients, updateICUMetrics } from '../controllers/icuController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, authorize(['admin', 'doctor']), getICUPatients);
router.patch('/:id/metrics', authenticate, authorize(['admin', 'doctor']), updateICUMetrics);

export default router;
