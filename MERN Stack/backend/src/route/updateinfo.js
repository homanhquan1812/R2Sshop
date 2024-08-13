const express = require('express')
const router = express.Router()
const updateInfo = require('../app/controller/UpdateInfoController.js')

router.post('/addcourse', updateInfo.addCourse)
router.put('/info', updateInfo.updateInfo)
router.put('/password', updateInfo.updatePassword)
router.delete('/deletecourse/:userId/:id', updateInfo.deleteCourse)

module.exports = router