package com.mealapp.repository;

import com.mealapp.model.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    
    // Find foods by category
    List<Food> findByCategory(String category);
    
    // Search foods by name or description
    @Query("SELECT f FROM Food f WHERE LOWER(f.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(f.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Food> searchFoods(@Param("query") String query, Pageable pageable);
    
    // Find featured foods (you can customize this logic)
    @Query("SELECT f FROM Food f ORDER BY f.id DESC")
    List<Food> findFeaturedFoods(Pageable pageable);
    
    // Find foods by calories range
    List<Food> findByCaloriesBetween(Integer minCalories, Integer maxCalories);
    
    // Find foods by prep time
    List<Food> findByPrepTimeLessThanEqual(Integer maxPrepTime);
    
    // Find foods by difficulty
    List<Food> findByDifficulty(String difficulty);
    
    // Custom query for complex filtering
    @Query("SELECT f FROM Food f WHERE " +
           "(:category IS NULL OR f.category = :category) AND " +
           "(:maxCalories IS NULL OR f.calories <= :maxCalories) AND " +
           "(:maxPrepTime IS NULL OR f.prepTime <= :maxPrepTime) AND " +
           "(:difficulty IS NULL OR f.difficulty = :difficulty)")
    Page<Food> findFoodsWithFilters(
        @Param("category") String category,
        @Param("maxCalories") Integer maxCalories,
        @Param("maxPrepTime") Integer maxPrepTime,
        @Param("difficulty") String difficulty,
        Pageable pageable
    );
}