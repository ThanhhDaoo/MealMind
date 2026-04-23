package com.mealapp.repository;

import com.mealapp.model.MealPlanItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealPlanItemRepository extends JpaRepository<MealPlanItem, Long> {
    
    List<MealPlanItem> findByMealPlanId(Long mealPlanId);
    
    List<MealPlanItem> findByMealPlanIdAndDayOfWeek(Long mealPlanId, String dayOfWeek);
    
    List<MealPlanItem> findByMealPlanIdAndMealType(Long mealPlanId, String mealType);
    
    void deleteByMealPlanId(Long mealPlanId);
}
