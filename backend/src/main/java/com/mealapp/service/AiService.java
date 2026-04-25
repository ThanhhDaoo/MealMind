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
import java.util.List;
import java.util.Random;

@Service
public class AiService {
    
    @Autowired
    private FoodRepository foodRepository;
    
    private final Random random = new Random();
    
    // Generate meal plan using AI (simplified version)
    public MealPlan generateMealPlan(User user, MealPlanGenerationRequest request) {
        MealPlan mealPlan = new MealPlan();
        mealPlan.setName("AI Generated Plan - " + request.getWeekStartDate());
        mealPlan.setWeekStartDate(request.getWeekStartDate());
        mealPlan.setWeekEndDate(request.getWeekStartDate().plusDays(6));
        mealPlan.setUser(user);
        mealPlan.setStatus("ACTIVE");
        
        List<MealPlanItem> mealItems = new ArrayList<>();
        
        // Get all available foods
        List<Food> allFoods = foodRepository.findAll();
        
        if (allFoods.isEmpty()) {
            throw new RuntimeException("No foods available in database");
        }
        
        // Filter foods based on dietary preferences if provided
        List<Food> filteredFoods = allFoods;
        if (request.getDietaryPreferences() != null && !request.getDietaryPreferences().isEmpty()) {
            filteredFoods = filterFoodsByPreferences(allFoods, request.getDietaryPreferences());
        }
        
        // If no foods match preferences, use all foods
        if (filteredFoods.isEmpty()) {
            filteredFoods = allFoods;
        }
        
        // Days of week
        String[] daysOfWeek = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};
        
        // Generate meals for each day
        for (String day : daysOfWeek) {
            // Breakfast
            Food breakfastFood = getRandomFood(filteredFoods);
            MealPlanItem breakfastItem = new MealPlanItem();
            breakfastItem.setMealType("BREAKFAST");
            breakfastItem.setDayOfWeek(day);
            breakfastItem.setFood(breakfastFood);
            breakfastItem.setServings(1);
            breakfastItem.setMealPlan(mealPlan);
            mealItems.add(breakfastItem);
            
            // Lunch
            Food lunchFood = getRandomFood(filteredFoods);
            MealPlanItem lunchItem = new MealPlanItem();
            lunchItem.setMealType("LUNCH");
            lunchItem.setDayOfWeek(day);
            lunchItem.setFood(lunchFood);
            lunchItem.setServings(1);
            lunchItem.setMealPlan(mealPlan);
            mealItems.add(lunchItem);
            
            // Dinner
            Food dinnerFood = getRandomFood(filteredFoods);
            MealPlanItem dinnerItem = new MealPlanItem();
            dinnerItem.setMealType("DINNER");
            dinnerItem.setDayOfWeek(day);
            dinnerItem.setFood(dinnerFood);
            dinnerItem.setServings(1);
            dinnerItem.setMealPlan(mealPlan);
            mealItems.add(dinnerItem);
        }
        
        mealPlan.setItems(mealItems);
        
        // Calculate total calories
        int totalCalories = mealItems.stream()
                .mapToInt(item -> item.getFood().getCalories() * item.getServings())
                .sum();
        mealPlan.setTotalCalories(totalCalories);
        
        return mealPlan;
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
}