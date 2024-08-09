package com.hcmut.r2sshop.controller;

import com.hcmut.r2sshop.dto.CourseDto;
import com.hcmut.r2sshop.service.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("courses")
public class CourseController {
    private final CourseService courseService;

    // [GET] /courses/:id
    @GetMapping("/{id}")
    public ResponseEntity<CourseDto> getCourseById(@PathVariable("id") Long courseId) {
        CourseDto courseDto = courseService.getCourseById(courseId);
        return ResponseEntity.ok(courseDto);
    }

    // [GET] /courses
    @GetMapping
    public ResponseEntity<List<CourseDto>> getAllCourses() {
        List<CourseDto> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    // [POST] /courses
    @PostMapping
    public ResponseEntity<CourseDto> createCourse(@RequestBody CourseDto courseDto) {
        CourseDto savedCourse = courseService.createCourse(courseDto);
        return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);
    }

    // [PUT] /courses/:id
    @PutMapping("/{id}")
    public ResponseEntity<CourseDto> updateCourse(@PathVariable("id") Long courseId, @RequestBody CourseDto updatedCourse) {
        try {
            CourseDto courseDto = courseService.updateCourse(courseId, updatedCourse);
            return ResponseEntity.ok(courseDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}