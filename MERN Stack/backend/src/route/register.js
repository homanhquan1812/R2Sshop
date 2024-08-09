const express = require('express')
const router = express.Router()
const registerController = require('../app/controller/RegisterController.js')

router.post('/', registerController.register)

module.exports = router