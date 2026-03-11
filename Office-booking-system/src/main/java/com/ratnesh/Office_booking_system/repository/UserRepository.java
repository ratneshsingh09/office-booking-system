package com.ratnesh.Office_booking_system.repository;

import com.ratnesh.Office_booking_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long>{

    User findByUsername(String username);

}