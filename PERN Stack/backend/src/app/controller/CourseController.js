const { pool } = require('../../../config/db')

class CourseController
{
    /*
     * 1. Show all courses
    */
    // [GET] /course
    async getAllCourses(req, res, next)
    {
        try {
            const query = `
                SELECT 
                    json_build_object(
                        '_id', ci.id,
                        'name', ci.name,
                        'price', rc.price,
                        'duration', rc.duration,
                        'number_of_students', rc.number_of_students,
                        'description', ci.description,
                        'type', cat.type,
                        'photo', ci.photo,
                        'updatedAt', CURRENT_TIMESTAMP
                    ) AS course_json
                FROM 
                    course_info ci
                JOIN 
                    r2s_course rc ON ci.id = rc.course_id
                JOIN 
                    category cat ON ci.category_id = cat.id;`
            const result = await pool.query(query)

            res.status(200).json({
                course: result.rows
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
            const courseId = req.params.id;

            const query = `
                SELECT 
                    json_build_object(
                        '_id', ci.id,
                        'name', ci.name,
                        'price', rc.price,
                        'duration', rc.duration,
                        'number_of_students', rc.number_of_students,
                        'description', ci.description,
                        'type', cat.type,
                        'photo', ci.photo,
                        'updatedAt', CURRENT_TIMESTAMP
                    ) AS course
                FROM 
                    course_info ci
                JOIN 
                    r2s_course rc ON ci.id = rc.course_id
                JOIN 
                    category cat ON ci.category_id = cat.id
                WHERE 
                    ci.id = $1;
            `;

            const result = await pool.query(query, [courseId]);

            if (result.rows.length === 0) {
                return res.status(404).json({
                    message: "No course found!"
                });
            }

            res.status(200).json({
                course: result.rows[0].course
            });
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