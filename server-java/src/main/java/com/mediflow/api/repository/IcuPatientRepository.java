package com.mediflow.api.repository;

import com.mediflow.api.model.IcuPatient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface IcuPatientRepository extends JpaRepository<IcuPatient, Long> {
    List<IcuPatient> findAllByOrderByLastUpdatedDesc();
    Optional<IcuPatient> findByAdmissionId(Long admissionId);
}
