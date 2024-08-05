package com.hcmut.r2sshop.mapper;

import com.hcmut.r2sshop.dto.CourseDto;
import com.hcmut.r2sshop.entity.Course;
import com.hcmut.r2sshop.entity.VariantCourse;

import java.util.List;
import java.util.stream.Collectors;

public class CourseMapper {
    public static CourseDto mapToCourseDto(Course course) {
        return new CourseDto(
                course.getId(),
                course.getName(),
                CategoryMapper.mapToCategoryDto(course.getCategory()),
                course.getVariantCourses().stream()
                        .map(VariantCourseMapper::mapToVariantCourseDto)
                        .collect(Collectors.toList())
        );
    }

    public static Course mapToCourse(CourseDto courseDto) {
        Course course = new Course(
                courseDto.getId(),
                courseDto.getName(),
                CategoryMapper.mapToCategory(courseDto.getCategory()),
                null  // Initialize with an empty list or handle accordingly
        );

        List<VariantCourse> variantCourses = courseDto.getVariant_courses().stream()
                .map(variantCourseDto -> {
                    VariantCourse variantCourse = VariantCourseMapper.mapToVariantCourse(variantCourseDto);
                    variantCourse.setCourse(course);  // Set the course reference
                    return variantCourse;
                })
                .collect(Collectors.toList());

        course.setVariantCourses(variantCourses);
        return course;
    }
}