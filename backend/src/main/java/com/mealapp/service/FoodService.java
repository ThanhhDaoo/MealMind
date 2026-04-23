package com.mealapp.service;

import com.mealapp.model.Food;
import com.mealapp.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {
    
    @Autowired
    private FoodRepository foodRepository;
    
    // Get all foods with filters
    public Page<Food> getAllFoods(String category, String search, Integer maxCalories, 
                                  Integer maxPrepTime, String difficulty, Pageable pageable) {
        if (search != null && !search.isEmpty()) {
            return foodRepository.searchFoods(search, pageable);
        }
        return foodRepository.findFoodsWithFilters(category, maxCalories, maxPrepTime, difficulty, pageable);
    }
    
    // Get featured foods
    public List<Food> getFeaturedFoods() {
        Pageable pageable = PageRequest.of(0, 6); // Get top 6 featured foods
        return foodRepository.findFeaturedFoods(pageable);
    }
    
    // Get food by ID
    public Food getFoodById(Long id) {
        return foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found with id: " + id));
    }
    
    // Search foods
    public Page<Food> searchFoods(String query, Pageable pageable) {
        return foodRepository.searchFoods(query, pageable);
    }
    
    // Get foods by category
    public List<Food> getFoodsByCategory(String category) {
        return foodRepository.findByCategory(category);
    }
    
    // Create new food
    public Food createFood(Food food) {
        return foodRepository.save(food);
    }
    
    // Update food
    public Food updateFood(Long id, Food foodDetails) {
        Food food = getFoodById(id);
        
        food.setName(foodDetails.getName());
        food.setDescription(foodDetails.getDescription());
        food.setImage(foodDetails.getImage());
        food.setCalories(foodDetails.getCalories());
        food.setPrepTime(foodDetails.getPrepTime());
        food.setDifficulty(foodDetails.getDifficulty());
        food.setCategory(foodDetails.getCategory());
        food.setInstructions(foodDetails.getInstructions());
        food.setNutrition(foodDetails.getNutrition());
        
        return foodRepository.save(food);
    }
    
    // Delete food
    public void deleteFood(Long id) {
        Food food = getFoodById(id);
        foodRepository.delete(food);
    }
    
    // Get foods by calories range
    public List<Food> getFoodsByCaloriesRange(Integer minCalories, Integer maxCalories) {
        return foodRepository.findByCaloriesBetween(minCalories, maxCalories);
    }
    
    // Get quick foods (prep time <= 30 minutes)
    public List<Food> getQuickFoods() {
        return foodRepository.findByPrepTimeLessThanEqual(30);
    }
}