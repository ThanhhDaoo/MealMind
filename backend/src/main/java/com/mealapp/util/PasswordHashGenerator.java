package com.mealapp.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Use CLI arg or default to a strong test password
        String password = args.length > 0 ? args[0] : "Test@123456";
        String hash = encoder.encode(password);

        System.out.println("Password: " + password);
        System.out.println("BCrypt Hash: " + hash);
        System.out.println("\nSQL to update a user:");
        System.out.println("UPDATE users SET password = '" + hash + "' WHERE email = '<email>';");
    }
}
