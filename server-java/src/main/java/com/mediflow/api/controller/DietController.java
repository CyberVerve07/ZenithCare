package com.mediflow.api.controller;

import com.mediflow.api.model.*;
import com.mediflow.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/diet")
public class DietController {

    @Autowired
    private DietPlanRepository dietPlanRepository;

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping
    public ResponseEntity<?> getDietPlans() {
        try {
            List<DietPlan> list = dietPlanRepository.findAll();
            
            // Map to Express-compatible JSON
            List<Map<String, Object>> response = new ArrayList<>();
            for (DietPlan dp : list) {
                Map<String, Object> item = new HashMap<>();
                item.put("id", dp.getId());
                item.put("patient_id", dp.getPatient().getId());
                item.put("patient_name", dp.getPatient().getName());
                item.put("breakfast", dp.getBreakfast());
                item.put("lunch", dp.getLunch());
                item.put("dinner", dp.getDinner());
                item.put("instructions", dp.getInstructions());
                item.put("plan_date", dp.getPlanDate());
                item.put("menu", String.format("Breakfast: %s\nLunch: %s\nDinner: %s", 
                        dp.getBreakfast(), dp.getLunch(), dp.getDinner()));
                
                response.add(item);
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateDietPlan(@RequestBody Map<String, Object> request) {
        try {
            Long patientId = Long.valueOf(request.get("patient_id").toString());
            String breakfast = request.get("breakfast").toString();
            String lunch = request.get("lunch").toString();
            String dinner = request.get("dinner").toString();
            String instructions = request.containsKey("instructions") ? request.get("instructions").toString() : "";

            Optional<Patient> patientOpt = patientRepository.findById(patientId);
            if (patientOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Patient not found"));
            }

            // Upsert pattern (insert or update)
            Optional<DietPlan> existingOpt = dietPlanRepository.findByPatientId(patientId);
            DietPlan dietPlan;
            
            if (existingOpt.isPresent()) {
                dietPlan = existingOpt.get();
                dietPlan.setBreakfast(breakfast);
                dietPlan.setLunch(lunch);
                dietPlan.setDinner(dinner);
                dietPlan.setInstructions(instructions);
            } else {
                dietPlan = new DietPlan(patientOpt.get(), breakfast, lunch, dinner, instructions);
            }

            DietPlan saved = dietPlanRepository.save(dietPlan);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", saved.getId());
            response.put("patient_id", saved.getPatient().getId());
            response.put("breakfast", saved.getBreakfast());
            response.put("lunch", saved.getLunch());
            response.put("dinner", saved.getDinner());
            response.put("instructions", saved.getInstructions());
            response.put("plan_date", saved.getPlanDate());
            response.put("menu", String.format("Breakfast: %s\nLunch: %s\nDinner: %s", 
                    saved.getBreakfast(), saved.getLunch(), saved.getDinner()));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
}
