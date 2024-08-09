package com.hcmut.r2sshop.controller;

import com.hcmut.r2sshop.dto.LoginDto;
import com.hcmut.r2sshop.dto.UserDto;
import com.hcmut.r2sshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping
public class UserController {

    @Autowired
    private UserService userService;

    // [GET] /user/:id
    @GetMapping("/user/{id}")
    public UserDto getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // [PUT] /user/:id
    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable("id") Long id,
            @RequestBody UserDto updatedUserDto) {
        try {
            UserDto userDto = userService.updateUser(id, updatedUserDto);
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // [POST] /login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            UserDto userDto = userService.login(loginDto);
            return ResponseEntity.ok(userDto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // [POST] /register
    @PostMapping("/register")
    public UserDto registerUser(@RequestBody UserDto userDto) {
        return userService.registerUser(userDto);
    }
}
