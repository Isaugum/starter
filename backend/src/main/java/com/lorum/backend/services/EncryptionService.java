package com.lorum.backend.services;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Service;

@Service
public class EncryptionService {

  private final Argon2 argon;

  public EncryptionService() {
    this.argon = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id, 16, 32);
  }

  public String hashPassword(String password) {
    return argon.hash(3, 65536, 1, password.toCharArray());
  }

  public boolean verifyPassword(String password, String hash) {
    return argon.verify(hash, password.toCharArray());
  }
}
