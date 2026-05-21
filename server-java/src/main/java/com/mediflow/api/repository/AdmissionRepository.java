package com.mediflow.api.repository;

import com.mediflow.api.model.Admission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AdmissionRepository extends JpaRepository<Admission, Long> {
    List<Admission> findAllByOrderByAdmissionDateDesc();
    
    // Equivalent of status = 'Admitted'
    long countByStatusIgnoreCase(String status);
}
