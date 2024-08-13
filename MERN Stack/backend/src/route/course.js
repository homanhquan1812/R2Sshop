const express = require('express')
const router = express.Router()
const CourseController = require('../app/controller/CourseController')

router.get('/', CourseController.getAllCourses)
router.get('/edit/:id', CourseController.getACourse)
router.get('/courseregistered', CourseController.getAllCoursesRegistered)
router.post('/add', CourseController.postACourse)
router.put('/edit/:id', CourseController.putACourse)
router.delete('/edit/:id', CourseController.deleteACourse)

module.exports = router