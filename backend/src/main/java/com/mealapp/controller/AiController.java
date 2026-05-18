package com.mealapp.controller;

import com.mealapp.dto.MealPlanGenerationRequest;
import com.mealapp.model.Food;
import com.mealapp.model.MealPlan;
import com.mealapp.model.User;
import com.mealapp.repository.MealPlanRepository;
import com.mealapp.repository.UserRepository;
import com.mealapp.service.AiService;
import com.mealapp.service.MealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AiController {

    @Autowired
    private AiService aiService;

    @Autowired
    private MealPlanService mealPlanService;

    @Autowired
    private MealPlanRepository mealPlanRepository;

    @Autowired
    private UserRepository userRepository;

    // ─── 1. Gợi ý món ăn theo nguyên liệu & chế độ ─────────────────────────────
    @PostMapping("/recommendations")
    public ResponseEntity<List<Food>> getRecommendations(
            @RequestBody RecommendationRequest request) {

        List<Food> recommendations = aiService.getRecommendations(
                request.getIngredients(),
                request.getDietaryRestrictions(),
                request.getMealType()
        );
        return ResponseEntity.ok(recommendations);
    }

    // ─── 2. Gợi ý món ăn theo user & loại bữa ───────────────────────────────────
    @GetMapping("/food-recommendations/{userId}")
    public ResponseEntity<List<Food>> getFoodRecommendations(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "BREAKFAST") String mealType) {

        User user = userRepository.findById(userId)
                .orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        List<Food> recommendations = aiService.getFoodRecommendations(user, mealType);
        return ResponseEntity.ok(recommendations);
    }

    // ─── 3. Phân tích dinh dưỡng của một meal plan ──────────────────────────────
    @GetMapping("/analyze-nutrition/{mealPlanId}")
    public ResponseEntity<Map<String, String>> analyzeNutrition(
            @PathVariable Long mealPlanId) {

        MealPlan mealPlan = mealPlanRepository.findById(mealPlanId)
                .orElse(null);
        if (mealPlan == null) {
            return ResponseEntity.notFound().build();
        }

        String analysis = aiService.analyzeNutrition(mealPlan);
        return ResponseEntity.ok(Map.of(
                "mealPlanId", String.valueOf(mealPlanId),
                "analysis", analysis,
                "totalCalories", String.valueOf(mealPlan.getTotalCalories())
        ));
    }

    // ─── 4. Tạo meal plan tự động bằng AI ───────────────────────────────────────
    @PostMapping("/generate-meal-plan/{userId}")
    public ResponseEntity<MealPlan> generateMealPlan(
            @PathVariable Long userId,
            @Valid @RequestBody MealPlanGenerationRequest request) {

        try {
            MealPlan mealPlan = mealPlanService.generateMealPlan(userId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(mealPlan);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ─── 5. Lấy gợi ý meal plan theo sở thích (trả về map day → food IDs) ───────
    @PostMapping("/meal-plan-recommendations")
    public ResponseEntity<Map<String, List<Long>>> getMealPlanRecommendations(
            @RequestBody MealPlanRecommendationRequest request) {

        Map<String, List<Long>> recommendations = aiService.generateMealPlanRecommendations(
                request.getDietaryPreferences(),
                request.getDays() != null ? request.getDays() : 7
        );
        return ResponseEntity.ok(recommendations);
    }

    // ─── Inner DTO classes ───────────────────────────────────────────────────────

    public static class RecommendationRequest {
        private String ingredients;
        private String dietaryRestrictions;
        private String mealType;

        public String getIngredients() { return ingredients; }
        public void setIngredients(String ingredients) { this.ingredients = ingredients; }

        public String getDietaryRestrictions() { return dietaryRestrictions; }
        public void setDietaryRestrictions(String dietaryRestrictions) {
            this.dietaryRestrictions = dietaryRestrictions;
        }

        public String getMealType() { return mealType; }
        public void setMealType(String mealType) { this.mealType = mealType; }
    }

    public static class MealPlanRecommendationRequest {
        private List<String> dietaryPreferences;
        private Integer days;

        public List<String> getDietaryPreferences() { return dietaryPreferences; }
        public void setDietaryPreferences(List<String> dietaryPreferences) {
            this.dietaryPreferences = dietaryPreferences;
        }

        public Integer getDays() { return days; }
        public void setDays(Integer days) { this.days = days; }
    }
}

