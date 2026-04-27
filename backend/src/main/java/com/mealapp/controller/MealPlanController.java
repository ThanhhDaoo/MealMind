package com.mealapp.controller;

import com.mealapp.dto.MealPlanGenerationRequest;
import com.mealapp.model.MealPlan;
import com.mealapp.model.User;
import com.mealapp.repository.UserRepository;
import com.mealapp.service.MealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/meal-plans")
@CrossOrigin(origins = "http://localhost:5173")
public class MealPlanController {
    
    @Autowired
    private MealPlanService mealPlanService;
    
    @Autowired
    private UserRepository userRepository;
    
    // Helper method to get current user ID from JWT token
    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            return user.getId();
        }
        throw new RuntimeException("User not authenticated");
    }
    
    // Get meal plans by date
    @GetMapping
    public ResponseEntity<List<MealPlan>> getMealPlansByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Long userId = getCurrentUserId();
        List<MealPlan> mealPlans = mealPlanService.getMealPlansByDate(userId, date);
        return ResponseEntity.ok(mealPlans);
    }
    
    // Get meal plan by ID
    @GetMapping("/{id}")
    public ResponseEntity<MealPlan> getMealPlanById(@PathVariable Long id) {
        MealPlan mealPlan = mealPlanService.getMealPlanById(id);
        return ResponseEntity.ok(mealPlan);
    }
    
    // Generate meal plan with AI
    @PostMapping("/generate")
    public ResponseEntity<MealPlan> generateMealPlan(@Valid @RequestBody MealPlanGenerationRequest request) {
        Long userId = getCurrentUserId();
        MealPlan mealPlan = mealPlanService.generateMealPlan(userId, request);
        return ResponseEntity.ok(mealPlan);
    }
    
    // Create custom meal plan
    @PostMapping
    public ResponseEntity<MealPlan> createMealPlan(@RequestBody MealPlan mealPlan) {
        Long userId = getCurrentUserId();
        MealPlan createdMealPlan = mealPlanService.createMealPlan(userId, mealPlan);
        return ResponseEntity.ok(createdMealPlan);
    }
    
    // Update meal plan
    @PutMapping("/{id}")
    public ResponseEntity<MealPlan> updateMealPlan(@PathVariable Long id, @RequestBody MealPlan mealPlan) {
        MealPlan updatedMealPlan = mealPlanService.updateMealPlan(id, mealPlan);
        return ResponseEntity.ok(updatedMealPlan);
    }
    
    // Delete meal plan
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMealPlan(@PathVariable Long id) {
        mealPlanService.deleteMealPlan(id);
        return ResponseEntity.noContent().build();
    }
    
    // Get meal plan history
    @GetMapping("/history")
    public ResponseEntity<Page<MealPlan>> getMealPlanHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Long userId = getCurrentUserId();
        Pageable pageable = PageRequest.of(page, size);
        Page<MealPlan> history = mealPlanService.getMealPlanHistory(userId, pageable);
        return ResponseEntity.ok(history);
    }
    
    // Add food to meal plan
    @PostMapping("/{mealPlanId}/meals")
    public ResponseEntity<MealPlan> addFoodToMealPlan(
            @PathVariable Long mealPlanId,
            @RequestBody AddMealRequest request) {
        MealPlan updatedPlan = mealPlanService.addFoodToMealPlan(
            mealPlanId, 
            request.getMealType(), 
            request.getFoodId(),
            request.getDayOfWeek()
        );
        return ResponseEntity.ok(updatedPlan);
    }
    
    // Remove food from meal plan
    @DeleteMapping("/{mealPlanId}/meals/{mealItemId}")
    public ResponseEntity<Void> removeFoodFromMealPlan(
            @PathVariable Long mealPlanId,
            @PathVariable Long mealItemId) {
        mealPlanService.removeFoodFromMealPlan(mealPlanId, mealItemId);
        return ResponseEntity.noContent().build();
    }
    
    // Inner class for request body
    public static class AddMealRequest {
        private String mealType;
        private Long foodId;
        private String dayOfWeek;
        
        public String getMealType() { return mealType; }
        public void setMealType(String mealType) { this.mealType = mealType; }
        
        public Long getFoodId() { return foodId; }
        public void setFoodId(Long foodId) { this.foodId = foodId; }
        
        public String getDayOfWeek() { return dayOfWeek; }
        public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }
    }
}
