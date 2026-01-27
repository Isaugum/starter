package com.lorum.backend.services;

import com.lorum.backend.dtos.auth.LoginRequestDto;
import com.lorum.backend.dtos.auth.LoginResponseDto;
import com.lorum.backend.dtos.auth.RefreshTokenDto;
import com.lorum.backend.dtos.auth.RegisterRequestDto;
import com.lorum.backend.dtos.user.UserResponseDto;
import com.lorum.backend.models.User;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final UserService userService;
  private final EncryptionService encryptionService;
  private final JwtService jwtService;

  public AuthService(
      UserService userService, EncryptionService encryptionService, JwtService jwtService) {
    this.userService = userService;
    this.encryptionService = encryptionService;
    this.jwtService = jwtService;
  }

  public LoginResponseDto loginUser(LoginRequestDto request) {
    User user = userService.getUserByEmail(request.getEmail());

    if (!user.verifyPassword(request.getPassword(), encryptionService)) {
      throw new RuntimeException("Invalid credentials");
    }

    String token = jwtService.getJwtCookie(user.getId(), user.getEmail());
    String refreshToken = jwtService.getRefreshCookie(user);

    UserResponseDto userDto = new UserResponseDto(user.getUsername(), user.getEmail());

    return new LoginResponseDto(userDto, token, refreshToken);
  }

  public void createUser(RegisterRequestDto request) {
    String password = encryptionService.hashPassword(request.getPassword());
    userService.createUser(request.getUsername(), request.getEmail(), password);
  }

  public RefreshTokenDto refreshTokens(String value) {
    return jwtService.useRefreshToken(value);
  }

  public void revokeAllUserTokens(User user) {
    jwtService.revokeAllUserTokens(user);
  }
}
