package com.lorum.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.Instant;
import java.util.UUID;

@Entity
public class RefreshToken {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String token;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @Column(nullable = false)
  private Instant expiryDate;

  private boolean revoked = false;

  public boolean isExpired() {
    return expiryDate.isBefore(Instant.now()) || revoked;
  }

  public void revoke() {
    this.revoked = true;
  }

  public static RefreshToken create(User user, long refreshExpirationMs) {
    RefreshToken refreshToken = new RefreshToken();
    refreshToken.setUser(user);
    refreshToken.setToken(UUID.randomUUID().toString());
    refreshToken.setExpiryDate(Instant.now().plusMillis(refreshExpirationMs));
    return refreshToken;
  }

  // Getters
  public Long getId() {
    return id;
  }

  public String getToken() {
    return token;
  }

  public User getUser() {
    return user;
  }

  public Instant getExpiryDate() {
    return expiryDate;
  }

  // Setters
  public void setId(Long id) {
    this.id = id;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public void setExpiryDate(Instant expiryDate) {
    this.expiryDate = expiryDate;
  }
}
