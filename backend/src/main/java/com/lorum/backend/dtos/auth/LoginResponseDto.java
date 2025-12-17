package com.lorum.backend.dtos.auth;

import com.lorum.backend.dtos.user.UserResponseDto;

public class LoginResponseDto {
    private UserResponseDto user;
    private String token;
    private String refreshToken;

    public LoginResponseDto(UserResponseDto user, String token, String refreshToken) {
        this.user = user;
        this.token = token;
        this.refreshToken = refreshToken;
    }

    // getters & setters
    public UserResponseDto getUser() { return user; }
    public String getToken() { return token; }
    public String getRefreshToken() { return refreshToken; }
}
