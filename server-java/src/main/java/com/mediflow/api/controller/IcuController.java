package com.mediflow.api.controller;

import com.mediflow.api.model.IcuPatient;
import com.mediflow.api.repository.IcuPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/icu")
public class IcuController {

    @Autowired
    private IcuPatientRepository icuPatientRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('Admin', 'Doctor')")
    public ResponseEntity<?> getICUPatients() {
        try {
            List<IcuPatient> list = icuPatientRepository.findAllByOrderByLastUpdatedDesc();
            
            // Map to Express-compatible JSON format
            List<Map<String, Object>> response = new ArrayList<>();
            for (IcuPatient icu : list) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", icu.getId());
                item.put("admission_id", icu.getAdmission().getId());
                item.put("patient_name", icu.getAdmission().getPatient().getName());
                item.put("bed_number", icu.getAdmission().getBedNumber());
                item.put("condition", icu.getAdmission().getCondition());
                item.put("status_flag", icu.getStatusFlag());
                item.put("critical_metrics", icu.getCriticalMetrics());
                item.put("last_updated", icu.getLastUpdated());
                
                response.add(item);
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/metrics")
    @PreAuthorize("hasAnyRole('Admin', 'Doctor')")
    public ResponseEntity<?> updateICUMetrics(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        try {
            Optional<IcuPatient> icuOpt = icuPatientRepository.findById(id);
            if (icuOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "ICU patient record not found"));
            }

            IcuPatient icu = icuOpt.get();
            if (request.containsKey("critical_metrics")) {
                Object metrics = request.get("critical_metrics");
                // If it's a map/json, convert it to JSON String, otherwise store as string
                if (metrics instanceof Map) {
                    // Simple serialization of map back to string or delegate to Jackson
                    com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                    icu.setCriticalMetrics(mapper.writeValueAsString(metrics));
                } else {
                    icu.setCriticalMetrics(metrics.toString());
                }
            }
            if (request.containsKey("status_flag")) {
                icu.setStatusFlag(request.get("status_flag").toString());
            }

            IcuPatient updated = icuPatientRepository.save(icu);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", updated.getId());
            response.put("admission_id", updated.getAdmission().getId());
            response.put("status_flag", updated.getStatusFlag());
            response.put("critical_metrics", updated.getCriticalMetrics());
            response.put("last_updated", updated.getLastUpdated());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
}
