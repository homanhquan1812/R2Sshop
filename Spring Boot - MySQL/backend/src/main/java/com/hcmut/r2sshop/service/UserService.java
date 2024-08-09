package com.hcmut.r2sshop.service;

import com.hcmut.r2sshop.dto.LoginDto;
import com.hcmut.r2sshop.dto.UserDto;
import com.hcmut.r2sshop.entity.User;
import com.hcmut.r2sshop.mapper.UserMapper;
import com.hcmut.r2sshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Base64;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // [POST] /register
    public UserDto registerUser(UserDto userDto) {
        User user = UserMapper.toEntity(userDto);

        String encodedPassword = Base64.getEncoder().encodeToString(userDto.getPassword().getBytes());
        user.setPassword(encodedPassword);

        user.setRole("User");

        User savedUser = userRepository.save(user);

        return UserMapper.toDto(savedUser);
    }


    // [GET] /user/:id
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return UserMapper.toDto(user);
    }

    // [POST] /login
    public UserDto login(LoginDto loginDto) {
        User user = userRepository.findByUsername(loginDto.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String encodedPassword = Base64.getEncoder().encodeToString(loginDto.getPassword().getBytes());

        if (!user.getPassword().equals(encodedPassword)) {
            throw new RuntimeException("Invalid password");
        }

        return UserMapper.toDto(user);
    }

    // [PUT] /user/{userId}
    public UserDto updateUser(Long userId, UserDto updatedUserDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User with ID: " + userId + " doesn't exist."));

        if (updatedUserDto.getFull_name() != null) {
            user.setFull_name(updatedUserDto.getFull_name());
        }

        if (updatedUserDto.getEmail() != null) {
            user.setEmail(updatedUserDto.getEmail());
        }

        if (updatedUserDto.getPassword() != null) {
            String encodedPassword = Base64.getEncoder().encodeToString(updatedUserDto.getPassword().getBytes());
            user.setPassword(encodedPassword);
        }

        if (updatedUserDto.getAddress() != null) {
            user.setAddress(updatedUserDto.getAddress());
        }

        User updatedUser = userRepository.save(user);
        return UserMapper.toDto(updatedUser);
    }
}
