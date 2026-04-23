package com.mealapp.repository;

import com.mealapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    Boolean existsByEmail(String email);
    
    List<User> findByRole(String role);
    
    List<User> findByStatus(String status);
    
    List<User> findByRoleAndStatus(String role, String status);
}
