package com.mealapp.dto;

import java.time.LocalDate;
import java.util.List;

public class MealPlanDTO {
    private Long id;
    private String name;
    private LocalDate weekStartDate;
    private LocalDate weekEndDate;
    private Integer totalCalories;
    private String status;
    private List<MealPlanItemDTO> items;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public LocalDate getWeekStartDate() { return weekStartDate; }
    public void setWeekStartDate(LocalDate weekStartDate) { this.weekStartDate = weekStartDate; }
    
    public LocalDate getWeekEndDate() { return weekEndDate; }
    public void setWeekEndDate(LocalDate weekEndDate) { this.weekEndDate = weekEndDate; }
    
    public Integer getTotalCalories() { return totalCalories; }
    public void setTotalCalories(Integer totalCalories) { this.totalCalories = totalCalories; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public List<MealPlanItemDTO> getItems() { return items; }
    public void setItems(List<MealPlanItemDTO> items) { this.items = items; }
}

class MealPlanItemDTO {
    private Long id;
    private String mealType;
    private String dayOfWeek;
    private Integer servings;
    private Long foodId;
    private String foodName;
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }
    
    public String getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }
    
    public Integer getServings() { return servings; }
    public void setServings(Integer servings) { this.servings = servings; }
    
    public Long getFoodId() { return foodId; }
    public void setFoodId(Long foodId) { this.foodId = foodId; }
    
    public String getFoodName() { return foodName; }
    public void setFoodName(String foodName) { this.foodName = foodName; }
}
