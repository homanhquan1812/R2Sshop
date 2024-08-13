require('dotenv').config()

const express = require('express')
const router = express.Router()
const loginController = require('../app/controller/LoginController.js')
const loginLimiter = require('../util/rate_limit')

router.post('/', loginLimiter, loginController.login)

module.exports = router