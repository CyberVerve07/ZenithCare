package com.mediflow.api.repository;

import com.mediflow.api.model.DietPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DietPlanRepository extends JpaRepository<DietPlan, Long> {
    Optional<DietPlan> findByPatientId(Long patientId);
}
