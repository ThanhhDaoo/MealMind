package com.mealapp.dto;

import com.mealapp.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    
    @NotBlank(message = "Tên không được để trống")
    @Size(min = 2, max = 100, message = "Tên phải từ 2-100 ký tự")
    private String name;
    
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;
    
    @Pattern(regexp = "^(USER|ADMIN)$", message = "Role phải là USER hoặc ADMIN")
    private String role;
    
    @Pattern(regexp = "^(active|inactive|banned)$", message = "Status phải là active, inactive hoặc banned")
    private String status;
    
    private String avatar;
    
    @Pattern(regexp = "^(\\+84|0)[0-9]{9,10}$", message = "Số điện thoại không hợp lệ (VD: 0912345678 hoặc +84912345678)")
    private String phone;
    
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    
    // Constructor from User entity
    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.status = user.getStatus();
        this.avatar = user.getAvatar();
        this.phone = user.getPhone();
        this.createdAt = user.getCreatedAt();
        this.lastLogin = user.getLastLogin();
    }
}
