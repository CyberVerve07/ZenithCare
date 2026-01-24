import express from 'express';
import { getUsers, getSystemStats } from '../controllers/adminController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/users', authenticate, authorize(['admin']), getUsers);
router.get('/stats', authenticate, authorize(['admin']), getSystemStats);

export default router;
