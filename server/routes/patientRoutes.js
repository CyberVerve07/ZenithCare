const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { auth, authorize } = require('../middleware/auth');

router.get('/admissions', auth, patientController.getAdmissions);
router.get('/admissions/:id', auth, patientController.getPatientDetails);
router.patch('/admissions/:id/condition', auth, authorize('Doctor', 'Nurse'), patientController.updateCondition);

module.exports = router;
