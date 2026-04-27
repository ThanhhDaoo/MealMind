package com.mealapp.controller;

import com.mealapp.model.Food;
import com.mealapp.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AiController {
    
    @Autowired
    private AiService aiService;
    
    @PostMapping("/recommendations")
    public ResponseEntity<List<Food>> getRecommendations(@RequestBody RecommendationRequest request) {
        List<Food> recommendations = aiService.getRecommendations(
            request.getIngredients(),
            request.getDietaryRestrictions(),
            request.getMealType()
        );
        return ResponseEntity.ok(recommendations);
    }
    
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
}
