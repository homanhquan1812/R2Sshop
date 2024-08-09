package com.hcmut.r2sshop.mapper;

import com.hcmut.r2sshop.dto.UserDto;
import com.hcmut.r2sshop.entity.User;

public class UserMapper {
    public static UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setPassword(user.getPassword());
        dto.setFull_name(user.getFull_name());
        dto.setEmail(user.getEmail());
        dto.setAddress(user.getAddress());
        dto.setRole(user.getRole());
        return dto;
    }

    public static User toEntity(UserDto dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setFull_name(dto.getFull_name());
        user.setEmail(dto.getEmail());
        user.setAddress(dto.getAddress());
        user.setRole(dto.getRole());
        return user;
    }
}