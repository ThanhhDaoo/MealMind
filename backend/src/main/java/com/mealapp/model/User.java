package com.mealapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(length = 50)
    private String role = "USER"; // USER, ADMIN
    
    @Column(length = 50)
    private String status = "ACTIVE"; // ACTIVE, INACTIVE, BLOCKED
    
    @Column(length = 500)
    private String avatar;
    
    @Column(length = 20)
    private String phone;
    
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    
    @Column(length = 20)
    private String gender;
    
    private Double height;
    
    private Double weight;
    
    @Column(name = "activity_level", length = 50)
    private String activityLevel;
    
    @Column(name = "dietary_preference", length = 100)
    private String dietaryPreference;
    
    @Column(name = "health_goals", columnDefinition = "NVARCHAR(MAX)")
    private String healthGoals;
    
    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String allergies;
    
    @Column(name = "last_login")
    private LocalDateTime lastLogin;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Relationships
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MealPlan> mealPlans = new HashSet<>();
    
    @ManyToMany
    @JoinTable(
        name = "user_favorite_foods",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "food_id")
    )
    private Set<Food> favoriteFoods = new HashSet<>();
}
