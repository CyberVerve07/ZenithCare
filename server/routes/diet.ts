import express from 'express';
import { getDietPlans, updateDietPlan } from '../controllers/dietController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getDietPlans);
router.post('/update', authenticate, updateDietPlan);

export default router;
