package com.mediflow.api.controller;

import com.mediflow.api.model.User;
import com.mediflow.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('Admin')")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AdmissionRepository admissionRepository;

    @GetMapping("/users")
    public ResponseEntity<?> getUsers() {
        try {
            List<User> list = userRepository.findAll();
            
            // Map to Express-compatible JSON (exclude password hash for safety)
            List<Map<String, Object>> response = new ArrayList<>();
            for (User u : list) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", u.getId());
                item.put("email", u.getEmail());
                item.put("role", u.getRole());
                item.put("name", u.getName());
                item.put("created_at", u.getCreatedAt());
                
                response.add(item);
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getSystemStats() {
        try {
            long totalUsers = userRepository.count();
            long totalPatients = patientRepository.count();
            // Count where status = 'Admitted'
            long activeAdmissions = admissionRepository.countByStatusIgnoreCase("Admitted");

            Map<String, Object> response = new HashMap<>();
            response.put("totalUsers", totalUsers);
            response.put("totalPatients", totalPatients);
            response.put("activeAdmissions", activeAdmissions);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}
