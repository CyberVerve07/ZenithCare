package com.mediflow.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "icu_patients")
public class IcuPatient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "admission_id", nullable = false)
    private Admission admission;

    @Column(name = "status_flag", nullable = false)
    private String statusFlag = "Stable"; // "Stable", "Critical"

    @Column(name = "critical_metrics", columnDefinition = "TEXT")
    private String criticalMetrics; // Store JSON string: {"pulse": "88 bpm", "bp": "120/80", "spo2": 98}

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        lastUpdated = LocalDateTime.now();
    }

    // Constructors
    public IcuPatient() {}

    public IcuPatient(Admission admission, String statusFlag, String criticalMetrics) {
        this.admission = admission;
        this.statusFlag = statusFlag;
        this.criticalMetrics = criticalMetrics;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Admission getAdmission() {
        return admission;
    }

    public void setAdmission(Admission admission) {
        this.admission = admission;
    }

    public String getStatusFlag() {
        return statusFlag;
    }

    public void setStatusFlag(String statusFlag) {
        this.statusFlag = statusFlag;
    }

    public String getCriticalMetrics() {
        return criticalMetrics;
    }

    public void setCriticalMetrics(String criticalMetrics) {
        this.criticalMetrics = criticalMetrics;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
