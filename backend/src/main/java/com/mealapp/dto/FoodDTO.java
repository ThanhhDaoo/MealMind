package com.mealapp.dto;

import lombok.Data;
import java.util.List;
import jakarta.validation.constraints.*;
import jakarta.validation.Valid;

@Data
public class FoodDTO {
    private Long id;
    
    @NotBlank(message = "Tên món ăn không được để trống")
    @Size(min = 3, max = 200, message = "Tên món ăn phải từ 3-200 ký tự")
    private String name;
    
    @NotBlank(message = "Mô tả không được để trống")
    @Size(min = 10, max = 2000, message = "Mô tả phải từ 10-2000 ký tự")
    private String description;
    
    private String image;
    
    @NotNull(message = "Calories không được để trống")
    @Min(value = 0, message = "Calories phải >= 0")
    @Max(value = 10000, message = "Calories phải <= 10000")
    private Integer calories;
    
    @NotNull(message = "Thời gian chuẩn bị không được để trống")
    @Min(value = 0, message = "Thời gian chuẩn bị phải >= 0")
    @Max(value = 1440, message = "Thời gian chuẩn bị phải <= 1440 phút")
    private Integer prepTime;
    
    @NotNull(message = "Thời gian nấu không được để trống")
    @Min(value = 0, message = "Thời gian nấu phải >= 0")
    @Max(value = 1440, message = "Thời gian nấu phải <= 1440 phút")
    private Integer cookTime;
    
    private Integer totalTime;
    
    @NotNull(message = "Số khẩu phần không được để trống")
    @Min(value = 1, message = "Số khẩu phần phải >= 1")
    @Max(value = 100, message = "Số khẩu phần phải <= 100")
    private Integer servings;
    
    @NotBlank(message = "Độ khó không được để trống")
    @Pattern(regexp = "^(Easy|Medium|Hard)$", message = "Độ khó phải là Easy, Medium hoặc Hard")
    private String difficulty;
    
    @NotBlank(message = "Danh mục không được để trống")
    private String category;
    
    private String cuisine;
    private String mealType;
    private String dietType;
    
    @NotNull(message = "Protein không được để trống")
    @Min(value = 0, message = "Protein phải >= 0")
    @Max(value = 1000, message = "Protein phải <= 1000g")
    private Double protein;
    
    @NotNull(message = "Carbs không được để trống")
    @Min(value = 0, message = "Carbs phải >= 0")
    @Max(value = 1000, message = "Carbs phải <= 1000g")
    private Double carbs;
    
    @NotNull(message = "Fat không được để trống")
    @Min(value = 0, message = "Fat phải >= 0")
    @Max(value = 1000, message = "Fat phải <= 1000g")
    private Double fat;
    
    @Min(value = 0, message = "Fiber phải >= 0")
    @Max(value = 1000, message = "Fiber phải <= 1000g")
    private Double fiber;
    
    @Min(value = 0, message = "Sugar phải >= 0")
    @Max(value = 1000, message = "Sugar phải <= 1000g")
    private Double sugar;
    
    @Min(value = 0, message = "Sodium phải >= 0")
    @Max(value = 10000, message = "Sodium phải <= 10000mg")
    private Double sodium;
    
    @Min(value = 0, message = "Rating phải >= 0")
    @Max(value = 5, message = "Rating phải <= 5")
    private Double rating;
    
    @Min(value = 0, message = "Rating count phải >= 0")
    private Integer ratingCount;
    
    @Min(value = 0, message = "View count phải >= 0")
    private Integer viewCount;
    
    @Min(value = 0, message = "Favorite count phải >= 0")
    private Integer favoriteCount;
    
    @Pattern(regexp = "^(active|inactive|draft)$", message = "Status phải là active, inactive hoặc draft")
    private String status;
    
    @NotNull(message = "Danh sách nguyên liệu không được để trống")
    @Size(min = 1, message = "Phải có ít nhất 1 nguyên liệu")
    @Valid
    private List<IngredientDTO> ingredients;
    
    @NotNull(message = "Danh sách hướng dẫn không được để trống")
    @Size(min = 1, message = "Phải có ít nhất 1 bước hướng dẫn")
    @Valid
    private List<InstructionDTO> instructions;
}
