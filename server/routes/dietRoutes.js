const express = require('express');
const router = express.Router();
const dietController = require('../controllers/dietController');
const { auth } = require('../middleware/auth');

router.get('/', auth, dietController.getDietPlans);
router.post('/', auth, dietController.createDietPlan);

module.exports = router;
