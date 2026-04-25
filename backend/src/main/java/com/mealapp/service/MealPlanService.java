package com.mealapp.service;

import com.mealapp.dto.MealPlanGenerationRequest;
import com.mealapp.model.Food;
import com.mealapp.model.MealPlan;
import com.mealapp.model.MealPlanItem;
import com.mealapp.model.User;
import com.mealapp.repository.FoodRepository;
import com.mealapp.repository.MealPlanRepository;
import com.mealapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MealPlanService {
    
    @Autowired
    private MealPlanRepository mealPlanRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private FoodRepository foodRepository;
    
    @Autowired
    private AiService aiService;
    
    // Get meal plans by user and date
    public List<MealPlan> getMealPlansByDate(Long userId, LocalDate date) {
        return mealPlanRepository.findByUserIdAndWeekStartDate(userId, date);
    }
    
    // Get meal plan by ID
    public MealPlan getMealPlanById(Long id) {
        return mealPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meal plan not found with id: " + id));
    }
    
    // Generate meal plan with AI
    public MealPlan generateMealPlan(Long userId, MealPlanGenerationRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Use AI service to generate meal plan
        MealPlan generatedPlan = aiService.generateMealPlan(user, request);
        
        // Save the generated meal plan
        return mealPlanRepository.save(generatedPlan);
    }
    
    // Create custom meal plan
    public MealPlan createMealPlan(Long userId, MealPlan mealPlan) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        mealPlan.setUser(user);
        return mealPlanRepository.save(mealPlan);
    }
    
    // Update meal plan
    public MealPlan updateMealPlan(Long id, MealPlan mealPlanDetails) {
        MealPlan mealPlan = getMealPlanById(id);
        
        mealPlan.setName(mealPlanDetails.getName());
        mealPlan.setWeekStartDate(mealPlanDetails.getWeekStartDate());
        mealPlan.setWeekEndDate(mealPlanDetails.getWeekEndDate());
        mealPlan.setTotalCalories(mealPlanDetails.getTotalCalories());
        
        return mealPlanRepository.save(mealPlan);
    }
    
    // Delete meal plan
    public void deleteMealPlan(Long id) {
        MealPlan mealPlan = getMealPlanById(id);
        mealPlanRepository.delete(mealPlan);
    }
    
    // Get meal plan history
    public Page<MealPlan> getMealPlanHistory(Long userId, Pageable pageable) {
        return mealPlanRepository.findByUserIdOrderByWeekStartDateDesc(userId, pageable);
    }
    
    // Get meal plans by date range
    public List<MealPlan> getMealPlansByDateRange(Long userId, LocalDate startDate, LocalDate endDate) {
        return mealPlanRepository.findByUserIdAndWeekStartDateBetween(userId, startDate, endDate);
    }
    
    // Calculate total calories for meal plan
    public Integer calculateTotalCalories(MealPlan mealPlan) {
        return mealPlan.getItems().stream()
                .mapToInt(item -> item.getFood().getCalories() * item.getServings())
                .sum();
    }
    
    // Add food to meal plan
    public MealPlan addFoodToMealPlan(Long mealPlanId, String mealType, Long foodId, String dayOfWeek) {
        MealPlan mealPlan = getMealPlanById(mealPlanId);
        
        // Create new meal plan item
        MealPlanItem item = new MealPlanItem();
        item.setMealPlan(mealPlan);
        item.setMealType(mealType);
        item.setDayOfWeek(dayOfWeek);
        item.setServings(1);
        
        // Get food from repository
        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food not found with id: " + foodId));
        item.setFood(food);
        
        // Add to meal plan
        mealPlan.getItems().add(item);
        
        // Recalculate total calories
        mealPlan.setTotalCalories(calculateTotalCalories(mealPlan));
        
        return mealPlanRepository.save(mealPlan);
    }
    
    // Remove food from meal plan
    public void removeFoodFromMealPlan(Long mealPlanId, Long mealItemId) {
        MealPlan mealPlan = getMealPlanById(mealPlanId);
        
        mealPlan.getItems().removeIf(item -> item.getId().equals(mealItemId));
        
        // Recalculate total calories
        mealPlan.setTotalCalories(calculateTotalCalories(mealPlan));
        
        mealPlanRepository.save(mealPlan);
    }
}