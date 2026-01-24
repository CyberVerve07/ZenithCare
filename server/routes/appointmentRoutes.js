const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { auth } = require('../middleware/auth');

router.get('/', auth, appointmentController.getAppointments);
router.get('/doctors', auth, appointmentController.getDoctors);
router.post('/book', auth, appointmentController.bookAppointment);

module.exports = router;
