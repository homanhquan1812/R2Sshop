package com.hcmut.r2sshop.mapper;

import com.hcmut.r2sshop.dto.VariantCourseDto;
import com.hcmut.r2sshop.entity.VariantCourse;

public class VariantCourseMapper {
    public static VariantCourseDto mapToVariantCourseDto(VariantCourse variantCourse) {
        return new VariantCourseDto(
                variantCourse.getId(),
                variantCourse.getPrice(),
                variantCourse.getDuration(),
                variantCourse.getNumber_of_students(),
                variantCourse.getType(),
                variantCourse.getPhoto(),
                variantCourse.getCourse().getId()
        );
    }

    public static VariantCourse mapToVariantCourse(VariantCourseDto variantCourseDto) {
        return new VariantCourse(
                variantCourseDto.getId(),
                variantCourseDto.getPrice(),
                variantCourseDto.getDuration(),
                variantCourseDto.getNumber_of_students(),
                variantCourseDto.getType(),
                variantCourseDto.getPhoto(),
                null  // This should be set after mapping the Course
        );
    }
}