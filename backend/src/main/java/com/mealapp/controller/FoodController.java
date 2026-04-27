package com.mealapp.controller;

import com.mealapp.dto.FoodDTO;
import com.mealapp.service.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FoodController {

    private final FoodService foodService;

    @GetMapping
    public ResponseEntity<?> getAllFoods(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(foodService.getAllFoodsWithPagination(page, size, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodDTO> getFoodById(@PathVariable Long id) {
        return ResponseEntity.ok(foodService.getFoodById(id));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<FoodDTO>> getFoodsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(foodService.getFoodsByCategory(category));
    }

    @GetMapping("/search")
    public ResponseEntity<List<FoodDTO>> searchFoods(@RequestParam String keyword) {
        return ResponseEntity.ok(foodService.searchFoods(keyword));
    }

    @GetMapping("/top-rated")
    public ResponseEntity<List<FoodDTO>> getTopRatedFoods() {
        return ResponseEntity.ok(foodService.getTopRatedFoods());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        return ResponseEntity.ok(foodService.getAllCategories());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FoodDTO> createFood(@Valid @RequestBody FoodDTO foodDTO) {
        return ResponseEntity.ok(foodService.createFood(foodDTO));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FoodDTO> updateFood(@PathVariable Long id, @Valid @RequestBody FoodDTO foodDTO) {
        return ResponseEntity.ok(foodService.updateFood(id, foodDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }
}
