package com.lorum.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class JwtProperties {

  private String jwtSecret;
  private int jwtExpirationMs;
  private int jwtRefreshExpirationMs;

  public JwtProperties(String jwtSecret, int jwtExpirationMs, int jwtRefreshExpirationMs) {
    this.jwtSecret = jwtSecret;
    this.jwtExpirationMs = jwtExpirationMs;
    this.jwtRefreshExpirationMs = jwtRefreshExpirationMs;
  }

  // getters + setters
  public String getSecret() {
    return this.jwtSecret;
  }

  public int getExpiration() {
    return this.jwtExpirationMs;
  }

  public int getRefreshExpiration() {
    return this.jwtRefreshExpirationMs;
  }
}
