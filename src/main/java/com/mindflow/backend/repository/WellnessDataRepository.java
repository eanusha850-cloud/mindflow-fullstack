package com.mindflow.backend.repository;

import com.mindflow.backend.model.WellnessData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WellnessDataRepository extends JpaRepository<WellnessData, Long> {
    // Add custom queries if needed later
}

