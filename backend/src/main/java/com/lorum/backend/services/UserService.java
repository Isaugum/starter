package com.lorum.backend.services;

import com.lorum.backend.dtos.user.UserResponseDto;
import com.lorum.backend.models.User;
import com.lorum.backend.repositories.UserRepository;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User getUserById(UUID id) {
    return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
  }

  public User getUserByEmail(String email) {
    return userRepository
        .findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));
  }

  public UserResponseDto getUserDto(User user) {
    return new UserResponseDto(user.getUsername(), user.getEmail());
  }

  public void createUser(String username, String email, String password) {
    User user = new User(username, email, password);

    userRepository.save(user);
  }
}
