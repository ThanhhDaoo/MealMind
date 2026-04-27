package com.mealapp.dto;

import jakarta.validation.constraints.NotBlank;
import com.mealapp.validation.StrongPassword;
import lombok.Data;

@Data
public class ChangePasswordRequest {
    
    @NotBlank(message = "Mật khẩu hiện tại không được để trống")
    private String currentPassword;
    
    @NotBlank(message = "Mật khẩu mới không được để trống")
    @StrongPassword
    private String newPassword;
}
