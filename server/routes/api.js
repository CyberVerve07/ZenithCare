const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const patientController = require('../controllers/patientController');
const appointmentController = require('../controllers/appointmentController');
const { verifyToken, authorize } = require('../middleware/auth');

// Auth
router.post('/auth/login', authController.login);
router.post('/auth/register', verifyToken, authorize('Admin'), authController.register);

// Patients
router.get('/patients', verifyToken, patientController.getPatients);
router.get('/admissions', verifyToken, patientController.getAdmissions);
router.post('/admissions', verifyToken, authorize(['Doctor', 'Nurse', 'Admin']), patientController.admitPatient);
router.post('/admissions/test', verifyToken, authorize(['Doctor', 'Nurse']), patientController.addTest);
router.post('/admissions/medicine', verifyToken, authorize(['Doctor', 'Nurse']), patientController.addMedicine);
router.patch('/admissions/:id/condition', verifyToken, authorize(['Doctor', 'Nurse']), patientController.updateCondition);

// Appointments
router.get('/appointments', verifyToken, appointmentController.getAppointments);
router.post('/appointments', verifyToken, appointmentController.bookAppointment);

// ICU
router.get('/icu', verifyToken, authorize(['Doctor', 'Admin']), appointmentController.getICUPatients);
router.patch('/icu/:id', verifyToken, authorize(['Doctor', 'Admin']), appointmentController.updateICUMetrics);

// Diet
router.get('/diet', verifyToken, appointmentController.getDietPlans);
router.post('/diet', verifyToken, authorize(['Nurse', 'Staff', 'Admin']), appointmentController.addDietPlan);

module.exports = router;
