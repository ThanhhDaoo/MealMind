package com.mealapp.controller;

import com.mealapp.dto.FoodDTO;
import com.mealapp.dto.UserDTO;
import com.mealapp.model.Food;
import com.mealapp.model.User;
import com.mealapp.repository.FoodRepository;
import com.mealapp.repository.UserRepository;
import com.mealapp.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
public class AdminController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private FoodRepository foodRepository;
    
    @Autowired
    private FoodService foodService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private com.mealapp.repository.MealPlanRepository mealPlanRepository;
    
    @Autowired
    private com.mealapp.service.JwtService jwtService;
    
    // User Management
    @GetMapping("/users")
    @Transactional(readOnly = true)
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> users = userRepository.findAll();
        // Convert to DTO immediately to avoid lazy loading issues
        List<UserDTO> userDTOs = users.stream()
                .map(user -> {
                    UserDTO dto = new UserDTO();
                    dto.setId(user.getId());
                    dto.setName(user.getName());
                    dto.setEmail(user.getEmail());
                    dto.setRole(user.getRole());
                    dto.setStatus(user.getStatus());
                    dto.setAvatar(user.getAvatar());
                    dto.setPhone(user.getPhone());
                    dto.setCreatedAt(user.getCreatedAt());
                    dto.setLastLogin(user.getLastLogin());
                    return dto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOs);
    }
    
    @GetMapping("/users/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setStatus(user.getStatus());
        dto.setAvatar(user.getAvatar());
        dto.setPhone(user.getPhone());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setLastLogin(user.getLastLogin());
        
        return ResponseEntity.ok(dto);
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
        
        // Admin can only update name, role, and status
        user.setName(userDetails.getName());
        user.setRole(userDetails.getRole());
        user.setStatus(userDetails.getStatus());
        
        // Do NOT allow password or email changes from admin panel
        
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
    
    // Temporary endpoint to promote user to admin - REMOVE IN PRODUCTION
    @PostMapping("/users/{id}/promote")
    public ResponseEntity<User> promoteToAdmin(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole("ADMIN");
        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
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
        long totalMealPlans = mealPlanRepository.count();
        
        DashboardStats stats = new DashboardStats();
        stats.setTotalUsers(totalUsers);
        stats.setTotalFoods(totalFoods);
        stats.setTotalOrders(0L); // Placeholder for AI recommendations
        stats.setTotalMealPlans(totalMealPlans);
        
        return ResponseEntity.ok(stats);
    }
    
    // Get all meal plans (for dashboard)
    @GetMapping("/meal-plans")
    @Transactional(readOnly = true)
    public ResponseEntity<List<com.mealapp.model.MealPlan>> getAllMealPlans() {
        List<com.mealapp.model.MealPlan> mealPlans = mealPlanRepository.findAll();
        return ResponseEntity.ok(mealPlans);
    }
    
    // Get meal plans by user ID
    @GetMapping("/users/{userId}/meal-plans")
    @Transactional(readOnly = true)
    public ResponseEntity<List<com.mealapp.model.MealPlan>> getUserMealPlans(@PathVariable Long userId) {
        List<com.mealapp.model.MealPlan> mealPlans = mealPlanRepository.findByUserId(userId);
        return ResponseEntity.ok(mealPlans);
    }
    
    // Settings - Get current admin profile (simplified version)
    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getCurrentProfile() {
        try {
            // For now, get the first admin user (can be improved later)
            User user = userRepository.findByRole("ADMIN").stream()
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Admin user not found"));
            
            UserDTO dto = new UserDTO();
            dto.setId(user.getId());
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());
            dto.setPhone(user.getPhone());
            dto.setRole(user.getRole());
            dto.setStatus(user.getStatus());
            dto.setAvatar(user.getAvatar());
            
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            throw new RuntimeException("Error getting profile: " + e.getMessage());
        }
    }
    
    // Settings - Update profile (simplified version)
    @PutMapping("/profile")
    public ResponseEntity<UserDTO> updateProfile(@RequestBody UserDTO profileUpdate) {
        try {
            // For now, update the first admin user
            User user = userRepository.findByRole("ADMIN").stream()
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Admin user not found"));
            
            // Update allowed fields
            if (profileUpdate.getName() != null) {
                user.setName(profileUpdate.getName());
            }
            if (profileUpdate.getPhone() != null) {
                user.setPhone(profileUpdate.getPhone());
            }
            // Email update requires additional validation
            if (profileUpdate.getEmail() != null && !profileUpdate.getEmail().equals(user.getEmail())) {
                if (userRepository.findByEmail(profileUpdate.getEmail()).isPresent()) {
                    throw new RuntimeException("Email already exists");
                }
                user.setEmail(profileUpdate.getEmail());
            }
            
            User savedUser = userRepository.save(user);
            
            UserDTO dto = new UserDTO();
            dto.setId(savedUser.getId());
            dto.setName(savedUser.getName());
            dto.setEmail(savedUser.getEmail());
            dto.setPhone(savedUser.getPhone());
            dto.setRole(savedUser.getRole());
            dto.setStatus(savedUser.getStatus());
            
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            throw new RuntimeException("Error updating profile: " + e.getMessage());
        }
    }
    
    // Settings - Change password (simplified version)
    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            // For now, update the first admin user
            User user = userRepository.findByRole("ADMIN").stream()
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Admin user not found"));
            
            // Verify current password
            if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
                throw new RuntimeException("Current password is incorrect");
            }
            
            // Update to new password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);
            
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            throw new RuntimeException("Error changing password: " + e.getMessage());
        }
    }
}

class ChangePasswordRequest {
    private String currentPassword;
    private String newPassword;
    
    public String getCurrentPassword() { return currentPassword; }
    public void setCurrentPassword(String currentPassword) { this.currentPassword = currentPassword; }
    
    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}

class DashboardStats {
    private Long totalUsers;
    private Long totalFoods;
    private Long totalOrders;
    private Long totalMealPlans;
    
    // Getters and setters
    public Long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }
    
    public Long getTotalFoods() { return totalFoods; }
    public void setTotalFoods(Long totalFoods) { this.totalFoods = totalFoods; }
    
    public Long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(Long totalOrders) { this.totalOrders = totalOrders; }
    
    public Long getTotalMealPlans() { return totalMealPlans; }
    public void setTotalMealPlans(Long totalMealPlans) { this.totalMealPlans = totalMealPlans; }
}
