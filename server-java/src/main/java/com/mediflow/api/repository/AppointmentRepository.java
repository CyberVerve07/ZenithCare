package com.mediflow.api.repository;

import com.mediflow.api.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findAllByOrderByAppointmentDateAsc();
    
    // Strict clinician conflict check:
    boolean existsByDoctorIdAndAppointmentDate(Long doctorId, String appointmentDate);
}
