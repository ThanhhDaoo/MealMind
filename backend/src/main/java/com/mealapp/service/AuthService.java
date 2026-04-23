package com.mealapp.service;

import com.mealapp.dto.AuthResponse;
import com.mealapp.model.User;
import com.mealapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;
    
    // User login
    public AuthResponse login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
        );
        
        String token = jwtService.generateToken(userDetails);
        return new AuthResponse(token, user);
    }
    
    // User registration
    public AuthResponse register(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("USER");
        
        User savedUser = userRepository.save(user);
        
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                savedUser.getEmail(),
                savedUser.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + savedUser.getRole()))
        );
        
        String token = jwtService.generateToken(userDetails);
        
        return new AuthResponse(token, savedUser);
    }
    
    // Refresh token
    public AuthResponse refreshToken(String token) {
        String email = jwtService.extractUsername(token.replace("Bearer ", ""));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
        );
        
        String newToken = jwtService.generateToken(userDetails);
        return new AuthResponse(newToken, user);
    }
    
    // Get current user
    public User getCurrentUser(String token) {
        String email = jwtService.extractUsername(token.replace("Bearer ", ""));
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    // Update user profile
    public User updateProfile(String token, User userDetails) {
        User user = getCurrentUser(token);
        
        user.setName(userDetails.getName());
        // Don't update email and password here
        
        return userRepository.save(user);
    }
    
    // Change password
    public void changePassword(String token, String currentPassword, String newPassword) {
        User user = getCurrentUser(token);
        
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}