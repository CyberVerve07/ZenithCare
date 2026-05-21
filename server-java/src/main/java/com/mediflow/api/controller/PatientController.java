package com.mediflow.api.controller;

import com.mediflow.api.model.*;
import com.mediflow.api.repository.*;
import com.mediflow.api.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping({"/api/patients", "/api/admissions"})
public class PatientController {

    @Autowired
    private AdmissionRepository admissionRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private IcuPatientRepository icuPatientRepository;

    @Autowired
    private DietPlanRepository dietPlanRepository;

    @Autowired
    private AiService aiService;

    @GetMapping
    public ResponseEntity<?> getAdmissions() {
        try {
            List<Admission> admissions = admissionRepository.findAllByOrderByAdmissionDateDesc();
            
            // Map to match the Node Express exact JSON payload response structure
            List<Map<String, Object>> response = new ArrayList<>();
            for (Admission ad : admissions) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", ad.getId());
                item.put("patient_id", ad.getPatient().getId());
                item.put("patient_name", ad.getPatient().getName());
                item.put("age", ad.getPatient().getAge());
                item.put("gender", ad.getPatient().getGender());
                item.put("department_id", ad.getDepartment().getId());
                item.put("department_name", ad.getDepartment().getName());
                item.put("doctor_id", ad.getDoctor().getId());
                item.put("doctor_name", ad.getDoctor().getUser().getName());
                item.put("bed_number", ad.getBedNumber());
                item.put("condition", ad.getCondition());
                item.put("current_condition", ad.getCurrentCondition());
                item.put("status", ad.getStatus());
                item.put("admission_date", ad.getAdmissionDate());
                item.put("daily_summary", ad.getDailySummary());
                
                response.add(item);
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/admit")
    @PreAuthorize("hasAnyRole('Admin', 'Doctor')")
    public ResponseEntity<?> admitPatient(@RequestBody Map<String, Object> request) {
        try {
            Long patientId = Long.valueOf(request.get("patient_id").toString());
            Long departmentId = Long.valueOf(request.get("department_id").toString());
            Long doctorId = Long.valueOf(request.get("doctor_id").toString());
            String bedNumber = request.get("bed_number").toString();
            String condition = request.get("condition").toString();

            Optional<Patient> patientOpt = patientRepository.findById(patientId);
            Optional<Department> deptOpt = departmentRepository.findById(departmentId);
            Optional<Doctor> docOpt = doctorRepository.findById(doctorId);

            if (patientOpt.isEmpty() || deptOpt.isEmpty() || docOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Invalid patient, department, or doctor ID"));
            }

            Admission admission = new Admission(patientOpt.get(), deptOpt.get(), docOpt.get(), bedNumber, condition);
            Admission saved = admissionRepository.save(admission);

            // Auto-create ICU record if bed number contains 'ICU'
            if (bedNumber.toUpperCase().contains("ICU")) {
                IcuPatient icu = new IcuPatient(saved, "Critical", "{\"pulse\": \"92 bpm\", \"bp\": \"130/85\", \"spo2\": 95}");
                icuPatientRepository.save(icu);
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('Doctor', 'Nurse')")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            Optional<Admission> adOpt = admissionRepository.findById(id);
            if (adOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Admission record not found"));
            }

            Admission ad = adOpt.get();
            if (request.containsKey("status")) {
                ad.setStatus(request.get("status"));
            }
            if (request.containsKey("condition")) {
                ad.setCondition(request.get("condition"));
                ad.setCurrentCondition(request.get("condition"));
            }

            Admission updated = admissionRepository.save(ad);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{id}/summary")
    @PreAuthorize("hasRole('Doctor')")
    public ResponseEntity<?> generateSummary(@PathVariable Long id) {
        try {
            Optional<Admission> adOpt = admissionRepository.findById(id);
            if (adOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Admission record not found"));
            }

            Admission admission = adOpt.get();

            // Fetch ICU metrics if any
            Optional<IcuPatient> icuOpt = icuPatientRepository.findByAdmissionId(id);
            String icuTelemetryStr = "None (General Ward)";
            if (icuOpt.isPresent()) {
                IcuPatient icu = icuOpt.get();
                icuTelemetryStr = String.format("Admitted in ICU (%s status). Vitals Telemetry: %s", 
                        icu.getStatusFlag(), icu.getCriticalMetrics());
            }

            // Fetch Diet plan if any
            Optional<DietPlan> dietOpt = dietPlanRepository.findByPatientId(admission.getPatient().getId());
            String dietPlanStr = "Standard Hospital Diet";
            if (dietOpt.isPresent()) {
                DietPlan diet = dietOpt.get();
                dietPlanStr = String.format("Breakfast: %s | Lunch: %s | Dinner: %s | Instructions: %s",
                        diet.getBreakfast(), diet.getLunch(), diet.getDinner(), diet.getInstructions());
            }

            // Call Groq Clinical Summary generator
            String summaryText = aiService.generateDailySummary(admission, icuTelemetryStr, dietPlanStr);

            // Save summary back to admission record
            admission.setDailySummary(summaryText);
            admissionRepository.save(admission);

            return ResponseEntity.ok(Map.of("summary", summaryText));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}
