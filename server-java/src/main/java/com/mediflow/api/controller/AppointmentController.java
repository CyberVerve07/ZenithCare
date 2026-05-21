package com.mediflow.api.controller;

import com.mediflow.api.model.*;
import com.mediflow.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping
    public ResponseEntity<?> getAppointments() {
        try {
            List<Appointment> list = appointmentRepository.findAllByOrderByAppointmentDateAsc();
            
            // Map to Express-compatible JSON
            List<Map<String, Object>> response = new ArrayList<>();
            for (Appointment app : list) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", app.getId());
                item.put("patient_id", app.getPatient().getId());
                item.put("patient_name", app.getPatient().getName());
                item.put("doctor_id", app.getDoctor().getId());
                item.put("doctor_name", app.getDoctor().getUser().getName());
                item.put("specialty", app.getDoctor().getSpecialty());
                item.put("appointment_date", app.getAppointmentDate());
                item.put("appointment_time", app.getAppointmentTime());
                item.put("status", app.getStatus());
                
                response.add(item);
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody Map<String, Object> request) {
        try {
            Long patientId = Long.valueOf(request.get("patient_id").toString());
            Long doctorId = Long.valueOf(request.get("doctor_id").toString());
            String appointmentDate = request.get("appointment_date").toString();

            // Strict conflict check: Does this clinician already have an appointment on this date?
            if (appointmentRepository.existsByDoctorIdAndAppointmentDate(doctorId, appointmentDate)) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(
                        Map.of("error", "Doctor already has an appointment at this time")
                );
            }

            Optional<Patient> patientOpt = patientRepository.findById(patientId);
            Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);

            if (patientOpt.isEmpty() || doctorOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Invalid patient or doctor ID"));
            }

            // Generate a random daytime interval slot (10:00 AM, 11:30 AM, etc.)
            int hour = (int) (Math.random() * 8) + 9;
            String min = Math.random() > 0.5 ? "00" : "30";
            String ampm = hour >= 12 ? "PM" : "AM";
            int displayHour = hour > 12 ? hour - 12 : hour;
            String time = String.format("%d:%s %s", displayHour, min, ampm);

            Appointment appointment = new Appointment(patientOpt.get(), doctorOpt.get(), appointmentDate, time);
            Appointment saved = appointmentRepository.save(appointment);

            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
}
