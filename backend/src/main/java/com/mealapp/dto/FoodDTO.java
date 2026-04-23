package com.mealapp.dto;

import lombok.Data;
import java.util.List;

@Data
public class FoodDTO {
    private Long id;
    private String name;
    private String description;
    private String image;
    private Integer calories;
    private Integer prepTime;
    private Integer cookTime;
    private Integer totalTime;
    private Integer servings;
    private String difficulty;
    private String category;
    private String cuisine;
    private String mealType;
    private String dietType;
    private Double protein;
    private Double carbs;
    private Double fat;
    private Double fiber;
    private Double sugar;
    private Double sodium;
    private Double rating;
    private Integer ratingCount;
    private Integer viewCount;
    private Integer favoriteCount;
    private String status;
    private List<IngredientDTO> ingredients;
    private List<InstructionDTO> instructions;
}
