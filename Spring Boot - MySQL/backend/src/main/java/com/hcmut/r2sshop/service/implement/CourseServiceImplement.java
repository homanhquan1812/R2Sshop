package com.hcmut.r2sshop.service.implement;

import com.hcmut.r2sshop.dto.CourseDto;
import com.hcmut.r2sshop.dto.VariantCourseDto;
import com.hcmut.r2sshop.entity.Category;
import com.hcmut.r2sshop.entity.Course;
import com.hcmut.r2sshop.entity.VariantCourse;
import com.hcmut.r2sshop.exception.Exception;
import com.hcmut.r2sshop.mapper.CourseMapper;
import com.hcmut.r2sshop.repository.CategoryRepository;
import com.hcmut.r2sshop.repository.CourseRepository;
import com.hcmut.r2sshop.repository.VariantCourseRepository;
import com.hcmut.r2sshop.service.CourseService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CourseServiceImplement implements CourseService {
    private final CourseRepository courseRepository;
    private final VariantCourseRepository variantCourseRepository;
    private final CategoryRepository categoryRepository;

    // [GET] /courses/:id
    @Override
    public CourseDto getCourseById(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new Exception("This course with ID: " + courseId + " doesn't exist."));
        return CourseMapper.mapToCourseDto(course);
    }

    // [GET] /courses
    @Override
    public List<CourseDto> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return courses.stream().map(CourseMapper::mapToCourseDto).collect(Collectors.toList());
    }

    // [POST] /courses/
    @Override
    public CourseDto createCourse(CourseDto courseDto) {
        Category category = new Category();
        category.setName(courseDto.getCategory().getName());
        category.setDescription(courseDto.getCategory().getDescription());
        category = categoryRepository.save(category);

        Course course = new Course();
        course.setName(courseDto.getName());
        course.setCategory(category);
        course = courseRepository.save(course);

        for (VariantCourseDto variantCourseDto : courseDto.getVariant_courses()) {
            VariantCourse variantCourse = new VariantCourse();
            variantCourse.setType(variantCourseDto.getType());
            variantCourse.setPrice(variantCourseDto.getPrice());
            variantCourse.setDuration(variantCourseDto.getDuration());
            variantCourse.setNumber_of_students(variantCourseDto.getNumber_of_students());
            variantCourse.setPhoto(variantCourseDto.getPhoto());
            variantCourse.setCourse(course);
            variantCourseRepository.save(variantCourse);
        }

        return CourseMapper.mapToCourseDto(course);
    }

    // [PUT] /courses/:id
    @Override
    public CourseDto updateCourse(Long courseId, CourseDto courseDto) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new Exception("This course with ID: " + courseId + " doesn't exist."));

        course.setName(courseDto.getName());

        // Update category
        if (courseDto.getCategory() != null) {
            Category category = categoryRepository.findById(courseDto.getCategory().getId())
                    .orElseThrow(() -> new Exception("Category with ID: " + courseDto.getCategory().getId() + " doesn't exist."));
            category.setName(courseDto.getCategory().getName());
            category.setDescription(courseDto.getCategory().getDescription());
            categoryRepository.save(category);
            course.setCategory(category);
        }

        // Update variant courses
        if (courseDto.getVariant_courses() != null) {
            List<VariantCourse> variantCourses = courseDto.getVariant_courses().stream().map(variantCourseDto -> {
                VariantCourse variantCourse = variantCourseRepository.findById(variantCourseDto.getId())
                        .orElseThrow(() -> new Exception("Variant course with ID: " + variantCourseDto.getId() + " doesn't exist."));
                variantCourse.setPrice(variantCourseDto.getPrice());
                variantCourse.setDuration(variantCourseDto.getDuration());
                variantCourse.setNumber_of_students(variantCourseDto.getNumber_of_students());
                variantCourse.setType(variantCourseDto.getType());
                variantCourse.setPhoto(variantCourseDto.getPhoto());
                return variantCourseRepository.save(variantCourse);
            }).collect(Collectors.toList());
            course.setVariantCourses(variantCourses);
        }

        Course updatedCourse = courseRepository.save(course);
        return CourseMapper.mapToCourseDto(updatedCourse);
    }
}
