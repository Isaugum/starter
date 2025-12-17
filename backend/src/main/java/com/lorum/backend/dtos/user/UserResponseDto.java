package com.lorum.backend.dtos.user;

public class UserResponseDto {
    private String username;
    private String email;

    // Constructors
    public UserResponseDto() {}

    public UserResponseDto(String username, String email) {
        this.username = username;
        this.email = email;
    }

    // Getters & Setters
    public String getUsername() { return username; }
    public String getEmail() { return email; }
}