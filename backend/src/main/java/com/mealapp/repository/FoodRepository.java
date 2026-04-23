package com.mealapp.repository;

import com.mealapp.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    
    List<Food> findByStatus(String status);
    
    List<Food> findByCategory(String category);
    
    List<Food> findByCategoryAndStatus(String category, String status);
    
    List<Food> findByNameContainingIgnoreCase(String name);
    
    @Query("SELECT f FROM Food f WHERE f.status = 'PUBLISHED' ORDER BY f.rating DESC, f.ratingCount DESC")
    List<Food> findTopRatedFoods();
    
    @Query("SELECT f FROM Food f WHERE f.status = 'PUBLISHED' ORDER BY f.favoriteCount DESC")
    List<Food> findMostFavoritedFoods();
    
    @Query("SELECT f FROM Food f WHERE f.status = 'PUBLISHED' AND f.calories BETWEEN :minCalories AND :maxCalories")
    List<Food> findByCaloriesRange(@Param("minCalories") Integer minCalories, @Param("maxCalories") Integer maxCalories);
    
    @Query("SELECT DISTINCT f.category FROM Food f WHERE f.status = 'PUBLISHED'")
    List<String> findAllCategories();
}
