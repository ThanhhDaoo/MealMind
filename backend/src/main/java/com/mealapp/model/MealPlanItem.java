package com.mealapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "meal_plan_items")
public class MealPlanItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type", nullable = false)
    private MealType mealType;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meal_plan_id")
    private MealPlan mealPlan;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_id")
    private Food food;
    
    private Integer servings = 1;
    
    // Constructors
    public MealPlanItem() {}
    
    public MealPlanItem(MealType mealType, MealPlan mealPlan, Food food) {
        this.mealType = mealType;
        this.mealPlan = mealPlan;
        this.food = food;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public MealType getMealType() { return mealType; }
    public void setMealType(MealType mealType) { this.mealType = mealType; }
    
    public MealPlan getMealPlan() { return mealPlan; }
    public void setMealPlan(MealPlan mealPlan) { this.mealPlan = mealPlan; }
    
    public Food getFood() { return food; }
    public void setFood(Food food) { this.food = food; }
    
    public Integer getServings() { return servings; }
    public void setServings(Integer servings) { this.servings = servings; }
}

enum MealType {
    BREAKFAST, LUNCH, DINNER, SNACK
}