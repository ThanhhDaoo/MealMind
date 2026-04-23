package com.mealapp.controller;

import com.mealapp.model.MealPlan;
import com.mealapp.service.MealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/meal-plans")
@CrossOrigin(origins = "http://localhost:3000")
public class MealPlanController {
    
    @Autowired
    private MealPlanService mealPlanService;
    
    // Get meal plans by date
    @GetMapping
    public ResponseEntity<List<MealPlan>> getMealPlansByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        // For now, using a dummy user ID. In real app, get from JWT token
        Long userId = 1L;
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
    public ResponseEntity<MealPlan> generateMealPlan(@RequestBody MealPlanGenerationRequest request) {
        // For now, using a dummy user ID. In real app, get from JWT token
        Long userId = 1L;
        MealPlan mealPlan = mealPlanService.generateMealPlan(userId, request);
        return ResponseEntity.ok(mealPlan);
    }
    
    // Create custom meal plan
    @PostMapping
    public ResponseEntity<MealPlan> createMealPlan(@RequestBody MealPlan mealPlan) {
        // For now, using a dummy user ID. In real app, get from JWT token
        Long userId = 1L;
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
        // For now, using a dummy user ID. In real app, get from JWT token
        Long userId = 1L;
        Pageable pageable = PageRequest.of(page, size);
        Page<MealPlan> history = mealPlanService.getMealPlanHistory(userId, pageable);
        return ResponseEntity.ok(history);
    }
}

// DTO for meal plan generation request
class MealPlanGenerationRequest {
    private LocalDate date;
    private MealPlanPreferences preferences;
    
    // Getters and setters
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    
    public MealPlanPreferences getPreferences() { return preferences; }
    public void setPreferences(MealPlanPreferences preferences) { this.preferences = preferences; }
}

class MealPlanPreferences {
    private Integer calories;
    private String diet;
    private List<String> allergies;
    
    // Getters and setters
    public Integer getCalories() { return calories; }
    public void setCalories(Integer calories) { this.calories = calories; }
    
    public String getDiet() { return diet; }
    public void setDiet(String diet) { this.diet = diet; }
    
    public List<String> getAllergies() { return allergies; }
    public void setAllergies(List<String> allergies) { this.allergies = allergies; }
}