package com.ratnesh.Office_booking_system.controller;

import com.ratnesh.Office_booking_system.entity.User;
import com.ratnesh.Office_booking_system.repository.UserRepository;
import com.ratnesh.Office_booking_system.security.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody User user){

        User existing = userRepository.findByUsername(user.getUsername());

        if(existing!=null && existing.getPassword().equals(user.getPassword())){

            String token = JwtUtil.generateToken(existing.getUsername(),user.getRole());

            return Map.of("token",token);

        }

        throw new RuntimeException("Invalid credentials");

    }

    @PostMapping("/register")
    public User register(@RequestBody User user){

        return userRepository.save(user);

    }

}