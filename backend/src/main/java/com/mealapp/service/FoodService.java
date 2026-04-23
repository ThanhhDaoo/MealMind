package com.mealapp.service;

import com.mealapp.dto.FoodDTO;
import com.mealapp.dto.IngredientDTO;
import com.mealapp.dto.InstructionDTO;
import com.mealapp.model.Food;
import com.mealapp.model.FoodInstruction;
import com.mealapp.model.Ingredient;
import com.mealapp.repository.FoodInstructionRepository;
import com.mealapp.repository.FoodRepository;
import com.mealapp.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;
    private final IngredientRepository ingredientRepository;
    private final FoodInstructionRepository instructionRepository;

    public List<FoodDTO> getAllFoods() {
        return foodRepository.findByStatus("PUBLISHED")
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public FoodDTO getFoodById(Long id) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found with id: " + id));
        
        // Increment view count
        food.setViewCount(food.getViewCount() + 1);
        foodRepository.save(food);
        
        return convertToDetailDTO(food);
    }

    public List<FoodDTO> getFoodsByCategory(String category) {
        return foodRepository.findByCategoryAndStatus(category, "PUBLISHED")
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<FoodDTO> searchFoods(String keyword) {
        return foodRepository.findByNameContainingIgnoreCase(keyword)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<FoodDTO> getTopRatedFoods() {
        return foodRepository.findTopRatedFoods()
                .stream()
                .limit(10)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<String> getAllCategories() {
        return foodRepository.findAllCategories();
    }

    @Transactional
    public FoodDTO createFood(FoodDTO foodDTO) {
        Food food = convertToEntity(foodDTO);
        food.setStatus("PUBLISHED");
        Food savedFood = foodRepository.save(food);
        
        // Save ingredients
        if (foodDTO.getIngredients() != null) {
            for (IngredientDTO ingredientDTO : foodDTO.getIngredients()) {
                Ingredient ingredient = new Ingredient();
                ingredient.setName(ingredientDTO.getName());
                ingredient.setAmount(ingredientDTO.getAmount());
                ingredient.setUnit(ingredientDTO.getUnit());
                ingredient.setFood(savedFood);
                ingredientRepository.save(ingredient);
            }
        }
        
        // Save instructions
        if (foodDTO.getInstructions() != null) {
            for (InstructionDTO instructionDTO : foodDTO.getInstructions()) {
                FoodInstruction instruction = new FoodInstruction();
                instruction.setInstruction(instructionDTO.getInstruction());
                instruction.setStepOrder(instructionDTO.getStepOrder());
                instruction.setFood(savedFood);
                instructionRepository.save(instruction);
            }
        }
        
        return convertToDetailDTO(savedFood);
    }

    @Transactional
    public FoodDTO updateFood(Long id, FoodDTO foodDTO) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found with id: " + id));
        
        updateFoodFromDTO(food, foodDTO);
        Food updatedFood = foodRepository.save(food);
        
        return convertToDetailDTO(updatedFood);
    }

    @Transactional
    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }

    private FoodDTO convertToDTO(Food food) {
        FoodDTO dto = new FoodDTO();
        dto.setId(food.getId());
        dto.setName(food.getName());
        dto.setDescription(food.getDescription());
        dto.setImage(food.getImage());
        dto.setCalories(food.getCalories());
        dto.setPrepTime(food.getPrepTime());
        dto.setCookTime(food.getCookTime());
        dto.setTotalTime(food.getTotalTime());
        dto.setServings(food.getServings());
        dto.setDifficulty(food.getDifficulty());
        dto.setCategory(food.getCategory());
        dto.setCuisine(food.getCuisine());
        dto.setMealType(food.getMealType());
        dto.setDietType(food.getDietType());
        dto.setProtein(food.getProtein());
        dto.setCarbs(food.getCarbs());
        dto.setFat(food.getFat());
        dto.setFiber(food.getFiber());
        dto.setSugar(food.getSugar());
        dto.setSodium(food.getSodium());
        dto.setRating(food.getRating());
        dto.setRatingCount(food.getRatingCount());
        dto.setViewCount(food.getViewCount());
        dto.setFavoriteCount(food.getFavoriteCount());
        dto.setStatus(food.getStatus());
        return dto;
    }

    private FoodDTO convertToDetailDTO(Food food) {
        FoodDTO dto = convertToDTO(food);
        
        // Add ingredients
        List<IngredientDTO> ingredients = ingredientRepository.findByFoodId(food.getId())
                .stream()
                .map(ing -> {
                    IngredientDTO ingDTO = new IngredientDTO();
                    ingDTO.setId(ing.getId());
                    ingDTO.setName(ing.getName());
                    ingDTO.setAmount(ing.getAmount());
                    ingDTO.setUnit(ing.getUnit());
                    return ingDTO;
                })
                .collect(Collectors.toList());
        dto.setIngredients(ingredients);
        
        // Add instructions
        List<InstructionDTO> instructions = instructionRepository.findByFoodIdOrderByStepOrderAsc(food.getId())
                .stream()
                .map(inst -> {
                    InstructionDTO instDTO = new InstructionDTO();
                    instDTO.setId(inst.getId());
                    instDTO.setInstruction(inst.getInstruction());
                    instDTO.setStepOrder(inst.getStepOrder());
                    return instDTO;
                })
                .collect(Collectors.toList());
        dto.setInstructions(instructions);
        
        return dto;
    }

    private Food convertToEntity(FoodDTO dto) {
        Food food = new Food();
        updateFoodFromDTO(food, dto);
        return food;
    }

    private void updateFoodFromDTO(Food food, FoodDTO dto) {
        food.setName(dto.getName());
        food.setDescription(dto.getDescription());
        food.setImage(dto.getImage());
        food.setCalories(dto.getCalories());
        food.setPrepTime(dto.getPrepTime());
        food.setCookTime(dto.getCookTime());
        food.setTotalTime(dto.getTotalTime());
        food.setServings(dto.getServings());
        food.setDifficulty(dto.getDifficulty());
        food.setCategory(dto.getCategory());
        food.setCuisine(dto.getCuisine());
        food.setMealType(dto.getMealType());
        food.setDietType(dto.getDietType());
        food.setProtein(dto.getProtein());
        food.setCarbs(dto.getCarbs());
        food.setFat(dto.getFat());
        food.setFiber(dto.getFiber());
        food.setSugar(dto.getSugar());
        food.setSodium(dto.getSodium());
    }
}
