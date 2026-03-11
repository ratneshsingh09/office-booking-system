package com.ratnesh.Office_booking_system.repository;

import com.ratnesh.Office_booking_system.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByWorkspaceIdAndDate(Long workspaceId, String date);

}