package com.lorum.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lorum.backend.dtos.user.UserResponseDto;
import com.lorum.backend.utils.ApiResponse;
import com.lorum.backend.security.UserPrincipal;
import com.lorum.backend.services.UserService;


@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping()
    public ResponseEntity<ApiResponse<UserResponseDto>> getUser(
        @AuthenticationPrincipal UserPrincipal principal
    ) {
        UserResponseDto user = userService.getUserDto(principal.getUser());

        return ResponseEntity.ok()
            .body(
                new ApiResponse<>(true, "", user)
            );
    } 
}
