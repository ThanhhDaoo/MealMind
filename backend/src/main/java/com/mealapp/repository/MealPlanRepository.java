package com.mealapp.repository;

import com.mealapp.model.MealPlan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {
    
    List<MealPlan> findByUserId(Long userId);
    
    List<MealPlan> findByUserIdAndStatus(Long userId, String status);
    
    List<MealPlan> findByUserIdAndWeekStartDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
    
    List<MealPlan> findByUserIdAndWeekStartDate(Long userId, LocalDate date);
    
    Page<MealPlan> findByUserIdOrderByWeekStartDateDesc(Long userId, Pageable pageable);
}
