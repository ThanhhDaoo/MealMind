package com.mealapp.repository;

import com.mealapp.model.FoodReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodReviewRepository extends JpaRepository<FoodReview, Long> {
    
    List<FoodReview> findByFoodId(Long foodId);
    
    List<FoodReview> findByUserId(Long userId);
    
    Optional<FoodReview> findByUserIdAndFoodId(Long userId, Long foodId);
    
    @Query("SELECT AVG(fr.rating) FROM FoodReview fr WHERE fr.food.id = :foodId")
    Double calculateAverageRating(@Param("foodId") Long foodId);
    
    Long countByFoodId(Long foodId);
}
