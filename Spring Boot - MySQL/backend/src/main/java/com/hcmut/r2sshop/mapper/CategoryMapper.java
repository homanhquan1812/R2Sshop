package com.hcmut.r2sshop.mapper;

import com.hcmut.r2sshop.dto.CategoryDto;
import com.hcmut.r2sshop.entity.Category;

public class CategoryMapper {
    public static CategoryDto mapToCategoryDto(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getName(),
                category.getDescription()
        );
    }

    public static Category mapToCategory(CategoryDto categoryDto) {
        return new Category(
                categoryDto.getId(),
                categoryDto.getName(),
                categoryDto.getDescription(),
                null  // Initialize with an empty list or handle accordingly
        );
    }
}
