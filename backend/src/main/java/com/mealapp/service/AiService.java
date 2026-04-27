package com.mealapp.service;

import com.mealapp.dto.MealPlanGenerationRequest;
import com.mealapp.model.Food;
import com.mealapp.model.MealPlan;
import com.mealapp.model.MealPlanItem;
import com.mealapp.model.User;
import com.mealapp.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class AiService {
    
    @Autowired
    private FoodRepository foodRepository;
    
    @Autowired
    private OpenAiService openAiService;
    
    private final Random random = new Random();
    
    // Generate meal plan recommendations (returns food IDs only, not MealPlan entity)
    public Map<String, List<Long>> generateMealPlanRecommendations(List<String> dietaryPreferences, int days) {
        Map<String, List<Long>> recommendations = new HashMap<>();
        
        // Get all available foods
        List<Food> allFoods = foodRepository.findAll();
        
        if (allFoods.isEmpty()) {
            throw new RuntimeException("No foods available in database");
        }
        
        // Filter foods based on dietary preferences if provided
        List<Food> filteredFoods = allFoods;
        if (dietaryPreferences != null && !dietaryPreferences.isEmpty()) {
            filteredFoods = filterFoodsByPreferences(allFoods, dietaryPreferences);
        }
        
        // If no foods match preferences, use all foods
        if (filteredFoods.isEmpty()) {
            filteredFoods = allFoods;
        }
        
        // Days of week
        String[] daysOfWeek = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};
        
        // Generate meal recommendations for each day
        for (int i = 0; i < Math.min(days, daysOfWeek.length); i++) {
            String day = daysOfWeek[i];
            
            // Breakfast
            Food breakfastFood = getRandomFood(filteredFoods);
            recommendations.put(day + "_BREAKFAST", List.of(breakfastFood.getId()));
            
            // Lunch
            Food lunchFood = getRandomFood(filteredFoods);
            recommendations.put(day + "_LUNCH", List.of(lunchFood.getId()));
            
            // Dinner
            Food dinnerFood = getRandomFood(filteredFoods);
            recommendations.put(day + "_DINNER", List.of(dinnerFood.getId()));
        }
        
        return recommendations;
    }
    
    // Filter foods by dietary preferences
    private List<Food> filterFoodsByPreferences(List<Food> foods, List<String> preferences) {
        List<Food> filtered = new ArrayList<>(foods);
        
        for (String preference : preferences) {
            if (preference == null || preference.trim().isEmpty()) {
                continue;
            }
            
            String pref = preference.toLowerCase().trim();
            
            // Filter by diet type
            if (pref.contains("keto")) {
                filtered = filtered.stream()
                    .filter(f -> f.getDietType() != null && 
                           (f.getDietType().toLowerCase().contains("keto") || 
                            f.getDietType().toLowerCase().contains("low carb")))
                    .collect(java.util.stream.Collectors.toList());
            } else if (pref.contains("vegan") || pref.contains("chay")) {
                filtered = filtered.stream()
                    .filter(f -> f.getDietType() != null && 
                           f.getDietType().toLowerCase().contains("vegetarian"))
                    .collect(java.util.stream.Collectors.toList());
            } else if (pref.contains("low-carb") || pref.contains("ít carb")) {
                filtered = filtered.stream()
                    .filter(f -> f.getCarbs() != null && f.getCarbs() < 30)
                    .collect(java.util.stream.Collectors.toList());
            } else if (pref.contains("high protein") || pref.contains("protein cao")) {
                filtered = filtered.stream()
                    .filter(f -> f.getProtein() != null && f.getProtein() > 20)
                    .collect(java.util.stream.Collectors.toList());
            }
            
            // Filter by preparation time
            if (pref.contains("nhanh") || pref.contains("15 phút") || pref.contains("20 phút")) {
                filtered = filtered.stream()
                    .filter(f -> f.getTotalTime() != null && f.getTotalTime() <= 20)
                    .collect(java.util.stream.Collectors.toList());
            }
            
            // Filter by calories
            if (pref.contains("ít calories") || pref.contains("low calorie")) {
                filtered = filtered.stream()
                    .filter(f -> f.getCalories() != null && f.getCalories() < 400)
                    .collect(java.util.stream.Collectors.toList());
            }
        }
        
        return filtered;
    }
    
    // Get a random food from the list
    private Food getRandomFood(List<Food> foods) {
        return foods.get(random.nextInt(foods.size()));
    }
    
    // Get random foods from the list
    private List<Food> getRandomFoods(List<Food> foods, int count) {
        List<Food> randomFoods = new ArrayList<>();
        for (int i = 0; i < count && i < foods.size(); i++) {
            Food randomFood = foods.get(random.nextInt(foods.size()));
            if (!randomFoods.contains(randomFood)) {
                randomFoods.add(randomFood);
            }
        }
        return randomFoods;
    }
    
    // Analyze nutrition and provide recommendations
    public String analyzeNutrition(MealPlan mealPlan) {
        // Simplified nutrition analysis
        int totalCalories = mealPlan.getTotalCalories();
        
        if (totalCalories < 1500) {
            return "Kế hoạch ăn có thể thiếu calories. Hãy thêm một số món ăn nhẹ.";
        } else if (totalCalories > 2500) {
            return "Kế hoạch ăn có thể có quá nhiều calories. Hãy giảm bớt một số món.";
        } else {
            return "Kế hoạch ăn có vẻ cân bằng về calories.";
        }
    }
    
    // Get food recommendations based on user preferences
    public List<Food> getFoodRecommendations(User user, String mealType) {
        // Simplified recommendation logic
        List<Food> allFoods = foodRepository.findAll();
        return getRandomFoods(allFoods, 5);
    }
    
    // Get AI recommendations based on ingredients and preferences
    public List<Food> getRecommendations(String ingredients, String dietaryRestrictions, String mealType) {
        List<Food> allFoods = foodRepository.findAll();
        
        if (allFoods.isEmpty()) {
            return new ArrayList<>();
        }
        
        // Filter foods by meal type and dietary restrictions first
        List<Food> filteredFoods = filterFoodsByPreferences(allFoods, dietaryRestrictions, mealType);
        
        if (filteredFoods.isEmpty()) {
            filteredFoods = allFoods;
        }
        
        // Convert foods to simple map for OpenAI
        List<Map<String, Object>> foodMaps = filteredFoods.stream()
            .map(food -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", food.getId());
                map.put("name", food.getName());
                map.put("description", food.getDescription());
                map.put("calories", food.getCalories());
                map.put("totalTime", food.getTotalTime());
                map.put("dietType", food.getDietType());
                return map;
            })
            .collect(Collectors.toList());
        
        // Get recommended food IDs from OpenAI
        List<Long> recommendedIds = openAiService.getRecommendedFoodIds(
            ingredients, dietaryRestrictions, mealType, foodMaps
        );
        
        // Get Food objects by IDs
        List<Food> recommendations = new ArrayList<>();
        for (Long id : recommendedIds) {
            foodRepository.findById(id).ifPresent(recommendations::add);
        }
        
        // If not enough recommendations, add random foods
        while (recommendations.size() < 3 && recommendations.size() < filteredFoods.size()) {
            Food randomFood = filteredFoods.get(random.nextInt(filteredFoods.size()));
            if (!recommendations.contains(randomFood)) {
                recommendations.add(randomFood);
            }
        }
        
        return recommendations;
    }
    
    private List<Food> filterFoodsByPreferences(List<Food> foods, String dietaryRestrictions, String mealType) {
        List<Food> filtered = new ArrayList<>(foods);
        
        // Filter by meal type (diet type)
        if (mealType != null && !mealType.trim().isEmpty()) {
            String diet = mealType.toLowerCase().trim();
            filtered = filtered.stream()
                .filter(f -> {
                    if (f.getDietType() == null) return false;
                    String foodDiet = f.getDietType().toLowerCase();
                    
                    if (diet.equals("keto")) {
                        return foodDiet.contains("keto") || foodDiet.contains("low carb");
                    } else if (diet.equals("vegan")) {
                        return foodDiet.contains("vegetarian") || foodDiet.contains("vegan");
                    } else if (diet.equals("low-carb")) {
                        return f.getCarbs() != null && f.getCarbs() < 30;
                    }
                    return true;
                })
                .collect(Collectors.toList());
        }
        
        // Filter by dietary restrictions
        if (dietaryRestrictions != null && !dietaryRestrictions.trim().isEmpty()) {
            String restrictions = dietaryRestrictions.toLowerCase();
            
            // Filter by time
            if (restrictions.contains("15 phút") || restrictions.contains("nhanh")) {
                filtered = filtered.stream()
                    .filter(f -> f.getTotalTime() != null && f.getTotalTime() <= 15)
                    .collect(Collectors.toList());
            } else if (restrictions.contains("20 phút")) {
                filtered = filtered.stream()
                    .filter(f -> f.getTotalTime() != null && f.getTotalTime() <= 20)
                    .collect(Collectors.toList());
            }
            
            // Filter by calories
            if (restrictions.contains("ít dầu") || restrictions.contains("ít calories")) {
                filtered = filtered.stream()
                    .filter(f -> f.getCalories() != null && f.getCalories() < 400)
                    .collect(Collectors.toList());
            }
        }
        
        return filtered;
    }
}