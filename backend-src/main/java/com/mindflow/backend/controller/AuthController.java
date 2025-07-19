package com.mindflow.backend.controller;

import com.mindflow.backend.model.User;
import com.mindflow.backend.repository.UserRepository;
import com.mindflow.backend.util.JwtUtil;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Simple test endpoint
     */
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("API is working!");
    }

    /**
     * Ping endpoint to check backend status
     */
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("Backend is running!");
    }

    /**
     * Signup endpoint
     */
    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        
        // Input validation
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            response.put("message", "Username is required!");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            response.put("message", "Email is required!");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (user.getPassword() == null || user.getPassword().length() < 6) {
            response.put("message", "Password must be at least 6 characters!");
            return ResponseEntity.badRequest().body(response);
        }
        
        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()) != null) {
            response.put("message", "Username already exists!");
            return ResponseEntity.badRequest().body(response);
        }
        
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            response.put("message", "Email already exists!");
            return ResponseEntity.badRequest().body(response);
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        userRepository.save(user);
        response.put("message", "User registered successfully!");
        return ResponseEntity.ok(response);
    }

    /**
     * Login endpoint with JWT token generation
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Map<String, String> response = new HashMap<>();
        
        // Input validation
        if (username == null || username.trim().isEmpty()) {
            response.put("message", "Username is required!");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (password == null || password.trim().isEmpty()) {
            response.put("message", "Password is required!");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userRepository.findByUsername(username);
        if (user == null) {
            response.put("message", "User not found");
            return ResponseEntity.badRequest().body(response);
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            response.put("message", "Invalid password");
            return ResponseEntity.badRequest().body(response);
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(username);

        response.put("message", "Login successful");
        response.put("token", token);
        return ResponseEntity.ok(response);
    }
}
