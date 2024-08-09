package com.hcmut.r2sshop.service;

import com.hcmut.r2sshop.dto.CourseDto;

import java.util.List;

public interface CourseService {
    // [GET] /courses/:id
    CourseDto getCourseById(Long courseId);

    // [GET] /courses
    List<CourseDto> getAllCourses();

    // [POST] /courses
    CourseDto createCourse(CourseDto courseDto);

    // [PUT] /courses/:id
    CourseDto updateCourse(Long courseId, CourseDto updateCourse);
}
