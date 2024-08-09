package com.hcmut.r2sshop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VariantCourseDto {
    private Long id;
    private float price;
    private int duration;
    private int number_of_students;
    private String type;
    private String photo;
    private Long courseId;
}