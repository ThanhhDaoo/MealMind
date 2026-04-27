package com.mealapp.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class StrongPasswordValidator implements ConstraintValidator<StrongPassword, String> {
    
    @Override
    public void initialize(StrongPassword constraintAnnotation) {
    }
    
    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null) {
            return false;
        }
        
        // Kiểm tra độ dài tối thiểu
        if (password.length() < 8) {
            return false;
        }
        
        // Kiểm tra có chữ hoa
        if (!password.matches(".*[A-Z].*")) {
            return false;
        }
        
        // Kiểm tra có chữ thường
        if (!password.matches(".*[a-z].*")) {
            return false;
        }
        
        // Kiểm tra có số
        if (!password.matches(".*[0-9].*")) {
            return false;
        }
        
        // Kiểm tra có ký tự đặc biệt
        if (!password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*")) {
            return false;
        }
        
        return true;
    }
}
