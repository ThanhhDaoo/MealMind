package com.mealapp.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;
import jakarta.validation.constraints.*;
import com.mealapp.validation.FutureOrToday;

@Data
public class MealPlanGenerationRequest {
    
    @NotNull(message = "Ngày bắt đầu không được để trống")
    @FutureOrToday
    private LocalDate weekStartDate;
    
    @NotNull(message = "Calories mỗi ngày không được để trống")
    @Min(value = 1000, message = "Calories mỗi ngày phải >= 1000")
    @Max(value = 5000, message = "Calories mỗi ngày phải <= 5000")
    private Integer caloriesPerDay;
    
    private List<String> dietaryPreferences;
}
