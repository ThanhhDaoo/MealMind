package com.mealapp.dto;

import com.mealapp.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String status;
    private String avatar;
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
