package com.mealapp.dto;

import lombok.Data;

@Data
public class IngredientDTO {
    private Long id;
    private String name;
    private String amount;
    private String unit;
}
