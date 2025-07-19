package com.mindflow.backend.repository;

import com.mindflow.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find user by username
     * @param username Username string
     * @return User object or null
     */
    User findByUsername(String username);

    /**
     * Find user by email
     * @param email Email string
     * @return Optional of User
     */
    Optional<User> findByEmail(String email);
}
