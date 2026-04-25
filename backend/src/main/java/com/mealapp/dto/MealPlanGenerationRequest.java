package com.mealapp.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class MealPlanGenerationRequest {
    private LocalDate weekStartDate;
    private Integer caloriesPerDay;
    private List<String> dietaryPreferences;
}
