package com.mealapp.controller;

import com.mealapp.dto.FoodDTO;
import com.mealapp.model.Food;
import com.mealapp.model.User;
import com.mealapp.repository.FoodRepository;
import com.mealapp.repository.UserRepository;
import com.mealapp.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private FoodRepository foodRepository;
    
    @Autowired
    private FoodService foodService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    // User Management
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User newUser) {
        // Check if email already exists
        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        // Hash password
        if (newUser.getPassword() != null && !newUser.getPassword().isEmpty()) {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        } else {
            throw new RuntimeException("Password is required");
        }
        
        // Set default values if not provided
        if (newUser.getRole() == null || newUser.getRole().isEmpty()) {
            newUser.setRole("USER");
        }
        if (newUser.getStatus() == null || newUser.getStatus().isEmpty()) {
            newUser.setStatus("ACTIVE");
        }
        
        User savedUser = userRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }
    
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setRole(userDetails.getRole());
        user.setStatus(userDetails.getStatus());
        
        // Only update password if provided
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }
        
        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
        return ResponseEntity.noContent().build();
    }
    
    // Food Management
    @PostMapping("/foods")
    public ResponseEntity<FoodDTO> createFood(@RequestBody FoodDTO foodDTO) {
        try {
            // Set default status if not provided
            if (foodDTO.getStatus() == null || foodDTO.getStatus().isEmpty()) {
                foodDTO.setStatus("PUBLISHED");
            }
            
            // Set default values for numeric fields if null
            if (foodDTO.getServings() == null) foodDTO.setServings(1);
            if (foodDTO.getCalories() == null) foodDTO.setCalories(0);
            
            FoodDTO savedFood = foodService.createFood(foodDTO);
            return ResponseEntity.ok(savedFood);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error creating food: " + e.getMessage(), e);
        }
    }
    
    @PutMapping("/foods/{id}")
    public ResponseEntity<FoodDTO> updateFood(@PathVariable Long id, @RequestBody FoodDTO foodDTO) {
        FoodDTO updatedFood = foodService.updateFood(id, foodDTO);
        return ResponseEntity.ok(updatedFood);
    }
    
    @DeleteMapping("/foods/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));
        foodRepository.delete(food);
        return ResponseEntity.noContent().build();
    }
    
    // Dashboard Stats
    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalFoods = foodRepository.count();
        
        DashboardStats stats = new DashboardStats();
        stats.setTotalUsers(totalUsers);
        stats.setTotalFoods(totalFoods);
        stats.setTotalOrders(0L); // Placeholder
        stats.setRevenue(0.0); // Placeholder
        
        return ResponseEntity.ok(stats);
    }
}

class DashboardStats {
    private Long totalUsers;
    private Long totalFoods;
    private Long totalOrders;
    private Double revenue;
    
    // Getters and setters
    public Long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }
    
    public Long getTotalFoods() { return totalFoods; }
    public void setTotalFoods(Long totalFoods) { this.totalFoods = totalFoods; }
    
    public Long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(Long totalOrders) { this.totalOrders = totalOrders; }
    
    public Double getRevenue() { return revenue; }
    public void setRevenue(Double revenue) { this.revenue = revenue; }
}
