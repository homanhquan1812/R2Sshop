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
                    category cat ON ci.category_id = cat.id
                ORDER BY 
                    ci.name ASC;`
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
    async getAllCoursesRegistered(req, res, next) {
        try {
            const query = `
                SELECT id, cart, name, username
                FROM users
            `
            const result = await pool.query(query)
    
            res.status(200).json({
                users: result.rows
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
            const query = `
                INSERT INTO courses (name, type, description, price, duration, photo, number_of_students)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `
            await pool.query(query, [name, type, description, price, duration, photo, number_of_students])
    
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
            const { name, type, description, price, duration, photo } = req.body;
            const courseId = req.params.id;

            // Start a transaction
            const client = await pool.connect();
            
            try {
                await client.query('BEGIN');

                // Update category (if needed)
                const categoryQuery = `
                    UPDATE category
                    SET type = $1
                    WHERE id = (SELECT category_id FROM course_info WHERE id = $2)
                `;
                await client.query(categoryQuery, [type, courseId]);

                // Update course_info
                const courseInfoQuery = `
                    UPDATE course_info
                    SET name = $1, description = $2, photo = $3
                    WHERE id = $4
                `;
                await client.query(courseInfoQuery, [name, description, photo, courseId]);

                // Update r2s_course
                const r2sCourseQuery = `
                    UPDATE r2s_course
                    SET price = $1, duration = $2
                    WHERE course_id = $3
                `;
                await client.query(r2sCourseQuery, [price, duration, courseId]);

                // Commit the transaction
                await client.query('COMMIT');

                res.status(200).json({
                    message: "Course updated successfully!"
                });
            } catch (error) {
                // Rollback the transaction in case of an error
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
            }
        } catch (error) {
            next(error)
        }
    }    

    /*
     * 5. Delete a course
    */
    // [DELETE] /course/:id
    async deleteACourse(req, res, next) {
        const courseId = req.params.id;

        try {
            // Start a transaction
            const client = await pool.connect();
            
            try {
                await client.query('BEGIN');

                // Delete from r2s_course (if this is a separate table)
                const r2sCourseDeleteQuery = `
                    DELETE FROM r2s_course
                    WHERE course_id = $1
                `;
                await client.query(r2sCourseDeleteQuery, [courseId]);

                // Delete from course_info
                const courseInfoDeleteQuery = `
                    DELETE FROM course_info
                    WHERE id = $1
                `;
                await client.query(courseInfoDeleteQuery, [courseId]);

                // Delete from category (if needed)
                const categoryDeleteQuery = `
                    DELETE FROM category
                    WHERE id = (SELECT category_id FROM course_info WHERE id = $1)
                `;
                await client.query(categoryDeleteQuery, [courseId]);

                // Commit the transaction
                await client.query('COMMIT');

                res.status(200).json({
                    message: "Course deleted successfully!"
                });
            } catch (error) {
                // Rollback the transaction in case of an error
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CourseController