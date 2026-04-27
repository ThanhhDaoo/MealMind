package com.mealapp.repository;

import com.mealapp.model.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    
    List<Food> findByStatus(String status);
    
    Page<Food> findByStatus(String status, Pageable pageable);
    
    Page<Food> findByNameContainingIgnoreCaseAndStatus(String name, String status, Pageable pageable);
    
    List<Food> findByCategory(String category);
    
    List<Food> findByCategoryAndStatus(String category, String status);
    
    List<Food> findByNameContainingIgnoreCase(String name);
    
    // Fetch food with ingredients and instructions in one query (fix N+1 problem)
    @Query("SELECT DISTINCT f FROM Food f " +
           "LEFT JOIN FETCH f.ingredients " +
           "LEFT JOIN FETCH f.instructions " +
           "WHERE f.id = :id")
    Optional<Food> findByIdWithDetails(@Param("id") Long id);
    
    // Fetch multiple foods with details (for AI recommendations)
    @Query("SELECT DISTINCT f FROM Food f " +
           "LEFT JOIN FETCH f.ingredients " +
           "LEFT JOIN FETCH f.instructions " +
           "WHERE f.id IN :ids")
    List<Food> findByIdsWithDetails(@Param("ids") List<Long> ids);
    
    @Query("SELECT f FROM Food f WHERE f.status = 'PUBLISHED' ORDER BY f.rating DESC, f.ratingCount DESC")
    List<Food> findTopRatedFoods();
    
    @Query("SELECT f FROM Food f WHERE f.status = 'PUBLISHED' ORDER BY f.favoriteCount DESC")
    List<Food> findMostFavoritedFoods();
    
    @Query("SELECT f FROM Food f WHERE f.status = 'PUBLISHED' AND f.calories BETWEEN :minCalories AND :maxCalories")
    List<Food> findByCaloriesRange(@Param("minCalories") Integer minCalories, @Param("maxCalories") Integer maxCalories);
    
    @Query("SELECT DISTINCT f.category FROM Food f WHERE f.status = 'PUBLISHED'")
    List<String> findAllCategories();
}
