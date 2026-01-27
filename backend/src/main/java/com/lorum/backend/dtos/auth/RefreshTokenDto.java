package com.lorum.backend.dtos.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RefreshTokenDto {
  private String accessToken;
  private String refreshToken;
  private String tokenType = "Bearer";

  // Getters
  public String getAccesToken() {
    return accessToken;
  }

  public String getRefreshToken() {
    return refreshToken;
  }
}
