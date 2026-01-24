const express = require('express');
const router = express.Router();
const icuController = require('../controllers/icuController');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, authorize('Admin', 'Doctor'), icuController.getICUPatients);
router.patch('/:id', auth, authorize('Admin', 'Doctor'), icuController.updateICUMetrics);

module.exports = router;
