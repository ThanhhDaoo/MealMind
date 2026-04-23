package com.mealapp.controller;

import com.mealapp.model.Food;
import com.mealapp.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodController {
    
    @Autowired
    private FoodService foodService;
    
    // Get all foods with optional filters
    @GetMapping
    public ResponseEntity<Page<Food>> getAllFoods(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer maxCalories,
            @RequestParam(required = false) Integer maxPrepTime,
            @RequestParam(required = false) String difficulty) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Food> foods = foodService.getAllFoods(category, search, maxCalories, maxPrepTime, difficulty, pageable);
        return ResponseEntity.ok(foods);
    }
    
    // Get featured foods
    @GetMapping("/featured")
    public ResponseEntity<List<Food>> getFeaturedFoods() {
        List<Food> featuredFoods = foodService.getFeaturedFoods();
        return ResponseEntity.ok(featuredFoods);
    }
    
    // Get food by ID
    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable Long id) {
        Food food = foodService.getFoodById(id);
        return ResponseEntity.ok(food);
    }
    
    // Search foods
    @GetMapping("/search")
    public ResponseEntity<Page<Food>> searchFoods(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Food> foods = foodService.searchFoods(q, pageable);
        return ResponseEntity.ok(foods);
    }
    
    // Get foods by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Food>> getFoodsByCategory(@PathVariable String category) {
        List<Food> foods = foodService.getFoodsByCategory(category);
        return ResponseEntity.ok(foods);
    }
    
    // Create new food (admin only)
    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody Food food) {
        Food createdFood = foodService.createFood(food);
        return ResponseEntity.ok(createdFood);
    }
    
    // Update food (admin only)
    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable Long id, @RequestBody Food food) {
        Food updatedFood = foodService.updateFood(id, food);
        return ResponseEntity.ok(updatedFood);
    }
    
    // Delete food (admin only)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }
}