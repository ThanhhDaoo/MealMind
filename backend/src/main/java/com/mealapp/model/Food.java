package com.mealapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "foods")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Food {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String description;
    
    @Column(length = 500)
    private String image;
    
    private Integer calories;
    
    @Column(name = "prep_time")
    private Integer prepTime;
    
    @Column(name = "cook_time")
    private Integer cookTime;
    
    @Column(name = "total_time")
    private Integer totalTime;
    
    private Integer servings = 1;
    
    @Column(length = 50)
    private String difficulty; // Easy, Medium, Hard
    
    @Column(length = 100)
    private String category;
    
    @Column(length = 100)
    private String cuisine;
    
    @Column(name = "meal_type", length = 50)
    private String mealType;
    
    @Column(name = "diet_type", length = 100)
    private String dietType;
    
    @Column(precision = 5, scale = 2)
    private Double protein;
    
    @Column(precision = 5, scale = 2)
    private Double carbs;
    
    @Column(precision = 5, scale = 2)
    private Double fat;
    
    @Column(precision = 5, scale = 2)
    private Double fiber;
    
    @Column(precision = 5, scale = 2)
    private Double sugar;
    
    @Column(precision = 5, scale = 2)
    private Double sodium;
    
    @Column(precision = 3, scale = 2)
    private Double rating = 0.0;
    
    @Column(name = "rating_count")
    private Integer ratingCount = 0;
    
    @Column(name = "view_count")
    private Integer viewCount = 0;
    
    @Column(name = "favorite_count")
    private Integer favoriteCount = 0;
    
    @Column(length = 50)
    private String status = "PUBLISHED"; // DRAFT, PUBLISHED, ARCHIVED
    
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Relationships
    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Ingredient> ingredients = new ArrayList<>();
    
    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<FoodInstruction> instructions = new ArrayList<>();
    
    @ManyToMany(mappedBy = "favoriteFoods")
    @JsonIgnore
    private Set<User> favoritedByUsers = new HashSet<>();
}
