const Courses = require('../model/Courses')
const Users = require('../model/Users')
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')

class CourseController
{
    /*
     * 1. Show all courses
    */
    // [GET] /course
    async getAllCourses(req, res, next)
    {
        try {
            const course = await Courses.find({})

            res.status(200).json({
                course: multipleMongooseToObject(course)
            })
        } catch (error) {
            next(error)
        }
    }

    /*
     * 2. Get a course
    */
    // [GET] /course/edit/:id
    async getACourse(req, res, next)
    {
        try {        
            const courseID = await Courses.findById(req.params.id)

            if (!courseID) {
                return res.status(404).json({
                    message: "No course found!"
                })
            }

            res.status(200).json({
                courseID: mongooseToObject(courseID)
            })
        } catch (error) {
            next(error)
        }
    }

    /*
     * 2. Get all courses registered by user
    */
    // [GET] /course/courseregistered
    async getAllCoursesRegistered(req, res, next)
    {
        try {        
            const userId = await Users.find({}, 'cart name username') // Only takes 'cart', 'name', and 'username' from Users

            res.status(200).json({
                userId: multipleMongooseToObject(userId)
            })
        } catch (error) {
            next(error)
        }
    }

    /*
     * 3. Add a course
    */
    // [POST] /course/add
    async postACourse(req, res, next) {
        try {
            const { name, type, description, price, duration, photo, number_of_students } = req.body
            const newCourse = new Courses(req.body)
            await newCourse.save()

            res.status(201).json({
                message: "Course added successfully!"
            })
        } catch (error) {
            next(error)
        }
    }

    /*
     * 4. Edit a course
    */
    // [PUT] /course/edit/:id
    async putACourse(req, res, next) {
        try {
            const { name, type, description, price, duration, photo } = req.body

            await Courses.findByIdAndUpdate(req.params.id, req.body)
            
            res.status(200).json({
                message: "Course updated successfully!"
            })
        } catch (error) {
            next(error)
        }
    }

    /*
     * 5. Delete a course
    */
    // [DELETE] /course/:id
    async deleteACourse(req, res, next) {
        try {
            await Courses.findByIdAndDelete(req.params.id)

            res.status(200).json({
                message: "Course deleted successfully!"
            })    
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CourseController