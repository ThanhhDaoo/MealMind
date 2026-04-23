package com.mealapp.dto;

import lombok.Data;

@Data
public class InstructionDTO {
    private Long id;
    private String instruction;
    private Integer stepOrder;
}
