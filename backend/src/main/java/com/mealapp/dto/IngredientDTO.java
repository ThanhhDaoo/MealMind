package com.mealapp.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class IngredientDTO {
    private Long id;
    
    @NotBlank(message = "Tên nguyên liệu không được để trống")
    @Size(min = 2, max = 200, message = "Tên nguyên liệu phải từ 2-200 ký tự")
    private String name;
    
    @NotBlank(message = "Số lượng không được để trống")
    @Size(max = 50, message = "Số lượng không được quá 50 ký tự")
    private String amount;
    
    @NotBlank(message = "Đơn vị không được để trống")
    @Size(max = 50, message = "Đơn vị không được quá 50 ký tự")
    private String unit;
}
