package com.mealapp.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class InstructionDTO {
    private Long id;
    
    @NotBlank(message = "Hướng dẫn không được để trống")
    @Size(min = 5, max = 1000, message = "Hướng dẫn phải từ 5-1000 ký tự")
    private String instruction;
    
    @NotNull(message = "Thứ tự bước không được để trống")
    @Min(value = 1, message = "Thứ tự bước phải >= 1")
    @Max(value = 100, message = "Thứ tự bước phải <= 100")
    private Integer stepOrder;
}
