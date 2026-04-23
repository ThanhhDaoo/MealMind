package com.mealapp.repository;

import com.mealapp.model.MealPlan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {
    
    // Find meal plans by user ID
    List<MealPlan> findByUserId(Long userId);
    
    // Find meal plans by user ID and date
    List<MealPlan> findByUserIdAndDate(Long userId, LocalDate date);
    
    // Find meal plan by user ID and date (single result)
    Optional<MealPlan> findByUserIdAndDateOrderByCreatedAtDesc(Long userId, LocalDate date);
    
    // Find meal plans by user ID with pagination
    Page<MealPlan> findByUserIdOrderByDateDesc(Long userId, Pageable pageable);
    
    // Find meal plans by date range
    @Query("SELECT mp FROM MealPlan mp WHERE mp.userId = :userId AND mp.date BETWEEN :startDate AND :endDate ORDER BY mp.date")
    List<MealPlan> findByUserIdAndDateBetween(
        @Param("userId") Long userId,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );
    
    // Count meal plans by user
    long countByUserId(Long userId);
}