package com.ratnesh.Office_booking_system.repository;

import com.ratnesh.Office_booking_system.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
}