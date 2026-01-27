package com.lorum.backend.security;

import com.lorum.backend.models.RefreshToken;
import com.lorum.backend.models.User;
import com.lorum.backend.repositories.RefreshTokenRepository;
import com.lorum.backend.repositories.UserRepository;
import com.lorum.backend.services.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final CookieService cookieService;
  private final RefreshTokenRepository refreshTokenRepository;
  private final UserRepository userRepository;

  public AuthenticationFilter(
      JwtService jwtService,
      CookieService cookieService,
      RefreshTokenRepository refreshTokenRepository,
      UserRepository userRepository) {
    this.jwtService = jwtService;
    this.cookieService = cookieService;
    this.refreshTokenRepository = refreshTokenRepository;
    this.userRepository = userRepository;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    String accessToken = cookieService.getCookie(request, "access_token");

    try {
      if (accessToken != null) {
        authenticate(accessToken, request);
      }
    } catch (ExpiredJwtException e) {

      String refreshTokenValue = cookieService.getCookie(request, "refresh_token");

      if (refreshTokenValue == null) {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        return;
      }

      RefreshToken refreshToken =
          refreshTokenRepository.findByToken(refreshTokenValue).orElse(null);

      if (refreshToken == null || jwtService.isRefreshTokenExpired(refreshToken)) {

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        return;
      }

      // 🔁 Issue new access token
      String newJwt =
          jwtService.generateToken(
              refreshToken.getUser().getId(), refreshToken.getUser().getEmail());

      response.addHeader(
          HttpHeaders.SET_COOKIE, jwtService.createResponseCookie(newJwt).toString());

      authenticate(newJwt, request);
    }

    filterChain.doFilter(request, response);
  }

  private void authenticate(String token, HttpServletRequest request) {
    UUID userId = jwtService.getUserId(token);
    User user =
        userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

    UserPrincipal principal = new UserPrincipal(user);

    var authToken =
        new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());

    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(authToken);
  }
}
