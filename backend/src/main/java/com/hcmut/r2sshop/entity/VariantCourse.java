package com.hcmut.r2sshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "variant_courses")
public class VariantCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price", nullable = false)
    private float price;

    @Column(name = "duration", nullable = false)
    private int duration;

    @Column(name = "number_of_students", nullable = false)
    private int number_of_students;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "photo", nullable = false)
    private String photo;

    @ManyToOne
    @JoinColumn(name = "courses_id", nullable = false)
    private Course course;
}
