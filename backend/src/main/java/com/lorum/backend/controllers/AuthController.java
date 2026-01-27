package com.lorum.backend.controllers;

import com.lorum.backend.dtos.auth.LoginRequestDto;
import com.lorum.backend.dtos.auth.LoginResponseDto;
import com.lorum.backend.dtos.auth.RefreshTokenDto;
import com.lorum.backend.dtos.auth.RegisterRequestDto;
import com.lorum.backend.dtos.user.UserResponseDto;
import com.lorum.backend.security.UserPrincipal;
import com.lorum.backend.services.AuthService;
import com.lorum.backend.utils.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private final AuthService service;

  public AuthController(AuthService service) {
    this.service = service;
  }

  @PostMapping("/login")
  public ResponseEntity<ApiResponse<UserResponseDto>> login(
      @Valid @RequestBody LoginRequestDto request) {
    LoginResponseDto loginData = service.loginUser(request);

    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, loginData.getToken())
        .header(HttpHeaders.SET_COOKIE, loginData.getRefreshToken())
        .body(new ApiResponse<UserResponseDto>(true, "Login succesful", loginData.getUser()));
  }

  @PostMapping("/register")
  public ResponseEntity<ApiResponse<String>> create(
      @Valid @RequestBody RegisterRequestDto request) {
    service.createUser(request);
    return ResponseEntity.ok(
        new ApiResponse<String>(true, "User registered", "User registered successfully!"));
  }

  @PostMapping("/logout")
  public ResponseEntity<?> logout(HttpServletResponse response) {
    ResponseCookie clearAccess =
        ResponseCookie.from("access_token", "").path("/").maxAge(0).build();

    ResponseCookie clearRefresh =
        ResponseCookie.from("refresh_token", "").path("/auth").maxAge(0).build();

    response.addHeader(HttpHeaders.SET_COOKIE, clearAccess.toString());
    response.addHeader(HttpHeaders.SET_COOKIE, clearRefresh.toString());

    return ResponseEntity.ok().build();
  }

  @PostMapping("/refresh")
  public ResponseEntity<ApiResponse<?>> refreshToken(
      @CookieValue(name = "refresh_token", required = false) String refreshTokenValue) {
    if (refreshTokenValue == null) {
      return ResponseEntity.status(401).body(new ApiResponse<>(false, "No refresh token", null));
    }

    RefreshTokenDto refreshTokens = service.refreshTokens(refreshTokenValue);

    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, refreshTokens.getAccessToken())
        .header(HttpHeaders.SET_COOKIE, refreshTokens.getRefreshToken())
        .build();
  }

  @PostMapping("/logout-all")
  public ResponseEntity<?> logoutAll(
      HttpServletResponse response, @AuthenticationPrincipal UserPrincipal principal) {
    service.revokeAllUserTokens(principal.getUser());

    ResponseCookie clearAccessCookie =
        ResponseCookie.from("access_token", "").path("/").maxAge(0).httpOnly(true).build();

    ResponseCookie clearRefreshCookie =
        ResponseCookie.from("refresh_token", "").path("/auth").maxAge(0).httpOnly(true).build();

    response.addHeader(HttpHeaders.SET_COOKIE, clearAccessCookie.toString());
    response.addHeader(HttpHeaders.SET_COOKIE, clearRefreshCookie.toString());
    return ResponseEntity.ok().build();
  }
}
