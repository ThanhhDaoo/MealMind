package com.mealapp.controller;

import com.mealapp.model.Food;
import com.mealapp.model.User;
import com.mealapp.repository.FoodRepository;
import com.mealapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setRole(userDetails.getRole());
        user.setStatus(userDetails.getStatus());
        
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
    public ResponseEntity<Food> createFood(@RequestBody Food food) {
        Food savedFood = foodRepository.save(food);
        return ResponseEntity.ok(savedFood);
    }
    
    @PutMapping("/foods/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable Long id, @RequestBody Food foodDetails) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));
        
        food.setName(foodDetails.getName());
        food.setDescription(foodDetails.getDescription());
        food.setImage(foodDetails.getImage());
        food.setCalories(foodDetails.getCalories());
        food.setPrepTime(foodDetails.getPrepTime());
        food.setCookTime(foodDetails.getCookTime());
        food.setTotalTime(foodDetails.getTotalTime());
        food.setServings(foodDetails.getServings());
        food.setDifficulty(foodDetails.getDifficulty());
        food.setCategory(foodDetails.getCategory());
        food.setCuisine(foodDetails.getCuisine());
        food.setMealType(foodDetails.getMealType());
        food.setDietType(foodDetails.getDietType());
        food.setProtein(foodDetails.getProtein());
        food.setCarbs(foodDetails.getCarbs());
        food.setFat(foodDetails.getFat());
        food.setFiber(foodDetails.getFiber());
        food.setStatus(foodDetails.getStatus());
        
        Food updatedFood = foodRepository.save(food);
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
