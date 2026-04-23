package com.mealapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "food_instructions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodInstruction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "food_id")
    @JsonIgnore
    private Food food;
    
    @Column(nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String instruction;
    
    @Column(name = "step_order")
    private Integer stepOrder;
}
