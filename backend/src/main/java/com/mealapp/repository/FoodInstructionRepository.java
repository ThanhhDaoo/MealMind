package com.mealapp.repository;

import com.mealapp.model.FoodInstruction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodInstructionRepository extends JpaRepository<FoodInstruction, Long> {
    
    List<FoodInstruction> findByFoodIdOrderByStepOrderAsc(Long foodId);
    
    void deleteByFoodId(Long foodId);
}
