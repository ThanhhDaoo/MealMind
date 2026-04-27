package com.mealapp.controller;

import com.mealapp.dto.AuthResponse;
import com.mealapp.dto.ChangePasswordRequest;
import com.mealapp.dto.LoginRequest;
import com.mealapp.dto.RegisterRequest;
import com.mealapp.model.User;
import com.mealapp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    // User login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(response);
    }
    
    // User registration
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request.getName(), request.getEmail(), request.getPassword());
        return ResponseEntity.ok(response);
    }
    
    // Refresh token
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestHeader("Authorization") String token) {
        AuthResponse response = authService.refreshToken(token);
        return ResponseEntity.ok(response);
    }
    
    // Get current user profile
    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(@RequestHeader("Authorization") String token) {
        User user = authService.getCurrentUser(token);
        return ResponseEntity.ok(user);
    }
    
    // Update user profile
    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestHeader("Authorization") String token, @Valid @RequestBody User userDetails) {
        User updatedUser = authService.updateProfile(token, userDetails);
        return ResponseEntity.ok(updatedUser);
    }
    
    // Change password
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestHeader("Authorization") String token, @Valid @RequestBody ChangePasswordRequest request) {
        authService.changePassword(token, request.getCurrentPassword(), request.getNewPassword());
        return ResponseEntity.ok("Password changed successfully");
    }
}
