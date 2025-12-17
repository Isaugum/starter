package com.lorum.backend.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import com.lorum.backend.config.JwtProperties;
import com.lorum.backend.dtos.auth.RefreshTokenDto;
import com.lorum.backend.models.RefreshToken;
import com.lorum.backend.models.User;
import com.lorum.backend.repositories.RefreshTokenRepository;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class JwtService {
    
    private final JwtProperties jwtProperties;
    private final RefreshTokenRepository refreshTokenRepository;

    public JwtService(JwtProperties jwtProperties, RefreshTokenRepository refreshTokenRepository) {
        this.jwtProperties = jwtProperties;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8));
    }

    public UUID getUserId(String token) {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    
        return UUID.fromString(claims.getSubject());
    }

    public String generateToken(UUID userId, String email) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .claim("email", email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpiration()))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public ResponseCookie createResponseCookie(String jwtToken) {
        return ResponseCookie.from("access_token", jwtToken)
            .httpOnly(true)
            .secure(false)
            .sameSite("Lax")
            .path("/")
            .maxAge(Duration.ofMinutes(15))
            .build();
    }

    public String getJwtCookie(UUID userId, String email) {
        String jwtToken = this.generateToken(userId, email);
        ResponseCookie responseCookie = this.createResponseCookie(jwtToken);

        return responseCookie.toString();
    }

    public String createRefreshToken(User user) {
        RefreshToken refreshToken = RefreshToken.create(user, jwtProperties.getRefreshExpiration());
        refreshTokenRepository.save(refreshToken);
        return refreshToken.getToken();
    }

    public ResponseCookie createRefreshCookie(String refreshToken) {
        return ResponseCookie.from("refresh_token", refreshToken)
            .httpOnly(true)
            .secure(false)
            .sameSite("Lax")
            .path("/auth")
            .maxAge(Duration.ofDays(7))
            .build();
    }

    public String getRefreshCookie(User user) {
        String refreshTokenValue = this.createRefreshToken(user);
        return this.createRefreshCookie(refreshTokenValue).toString();
    }

    public boolean isRefreshTokenExpired(RefreshToken token) {
        return token.getExpiryDate().isBefore(Instant.now());
    }

    public RefreshToken getNewRefreshToken(String refreshTokenValue) {
        RefreshToken token = refreshTokenRepository
            .findByToken(refreshTokenValue)
            .orElseThrow(() -> new RuntimeException("Refresh token not found"));
    
        if (token.isExpired()) {
            token.revoke();
            refreshTokenRepository.save(token);
            throw new RuntimeException("Refresh token expired or revoked");
        }
    
        token.revoke();
        refreshTokenRepository.save(token);
    
        RefreshToken newToken = RefreshToken.create(token.getUser(), jwtProperties.getRefreshExpiration());
        refreshTokenRepository.save(newToken);
    
        return newToken;
    }
    
    public RefreshTokenDto useRefreshToken(String refreshTokenValue) {
        RefreshToken newToken = this.getNewRefreshToken(refreshTokenValue);
        User user = newToken.getUser();
    
        String accessTokenCookie = this.getJwtCookie(user.getId(), user.getEmail());
        String refreshCookie = this.createRefreshCookie(newToken.getToken()).toString(); 
    
        return new RefreshTokenDto(accessTokenCookie, refreshCookie, "Bearer");
    }

    public void revokeAllUserTokens(User user) {
        List<RefreshToken> tokens = refreshTokenRepository.findAllByUser(user);
        for (RefreshToken token : tokens) {
            token.revoke();
        }
        refreshTokenRepository.saveAll(tokens);
    }
}