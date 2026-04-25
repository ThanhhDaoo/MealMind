package com.mealapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "meal_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealPlan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "week_start_date", nullable = false)
    private LocalDate weekStartDate;
    
    @Column(name = "week_end_date", nullable = false)
    private LocalDate weekEndDate;
    
    @Column(name = "total_calories")
    private Integer totalCalories;
    
    @Column(name = "total_budget", precision = 10, scale = 2)
    private BigDecimal totalBudget;
    
    @Column(length = 50)
    private String status = "ACTIVE"; // ACTIVE, COMPLETED, CANCELLED
    
    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String notes;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Relationships
    @OneToMany(mappedBy = "mealPlan", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<MealPlanItem> items = new ArrayList<>();
}
