package com.mealapp.repository;

import com.mealapp.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    
    // Find ingredients by food ID
    List<Ingredient> findByFoodId(Long foodId);
    
    // Find ingredients by name
    List<Ingredient> findByNameContainingIgnoreCase(String name);
}