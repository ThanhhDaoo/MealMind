package com.mealapp.service;

import com.mealapp.controller.MealPlanGenerationRequest;
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
        mealPlan.setName("AI Generated Plan - " + request.getDate());
        mealPlan.setDate(request.getDate());
        mealPlan.setUser(user);
        
        List<MealPlanItem> mealItems = new ArrayList<>();
        
        // Get all available foods
        List<Food> allFoods = foodRepository.findAll();
        
        // Generate breakfast items
        List<Food> breakfastFoods = getRandomFoods(allFoods, 2);
        for (Food food : breakfastFoods) {
            MealPlanItem item = new MealPlanItem();
            item.setMealType(MealType.BREAKFAST);
            item.setFood(food);
            item.setMealPlan(mealPlan);
            mealItems.add(item);
        }
        
        // Generate lunch items
        List<Food> lunchFoods = getRandomFoods(allFoods, 3);
        for (Food food : lunchFoods) {
            MealPlanItem item = new MealPlanItem();
            item.setMealType(MealType.LUNCH);
            item.setFood(food);
            item.setMealPlan(mealPlan);
            mealItems.add(item);
        }
        
        // Generate dinner items
        List<Food> dinnerFoods = getRandomFoods(allFoods, 3);
        for (Food food : dinnerFoods) {
            MealPlanItem item = new MealPlanItem();
            item.setMealType(MealType.DINNER);
            item.setFood(food);
            item.setMealPlan(mealPlan);
            mealItems.add(item);
        }
        
        mealPlan.setMealItems(mealItems);
        
        // Calculate total calories
        int totalCalories = mealItems.stream()
                .mapToInt(item -> item.getFood().getCalories())
                .sum();
        mealPlan.setTotalCalories(totalCalories);
        
        return mealPlan;
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