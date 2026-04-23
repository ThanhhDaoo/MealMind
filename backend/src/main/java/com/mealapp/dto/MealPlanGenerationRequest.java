package com.mealapp.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class MealPlanGenerationRequest {
    private LocalDate date;
    private MealPlanPreferences preferences;
}

@Data
class MealPlanPreferences {
    private Integer calories;
    private String diet;
    private List<String> allergies;
}
