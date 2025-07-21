package com.mindflow.backend.controller;

import com.mindflow.backend.model.User;
import com.mindflow.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    /**
     * Signup endpoint
     * @param user User object from request body
     * @return Success or error message
     */
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists";
        }

        // Save user
        userRepository.save(user);
        return "Signup successful";
    }

    /**
     * Login endpoint
     * @param user User object with email and password
     * @return Success or error message
     */
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            return "Login successful";
        } else {
            return "Invalid email or password";
        }
    }
}
