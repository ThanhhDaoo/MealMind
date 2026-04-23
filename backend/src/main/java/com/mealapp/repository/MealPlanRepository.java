package com.mealapp.repository;

import com.mealapp.model.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {
    
    List<MealPlan> findByUserId(Long userId);
    
    List<MealPlan> findByUserIdAndStatus(Long userId, String status);
    
    List<MealPlan> findByUserIdAndWeekStartDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
}
