const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { pool } = require('../../../config/db')

class LoginController
{
    // [POST] /login
    async login(req, res, next) {
        // For Express rate limit
        req.session.loginPassed = false

        const { username, password } = req.body

        try {
            const userQuery = 'SELECT * FROM users WHERE username = $1'
            const adminQuery = 'SELECT * FROM admins WHERE username = $1'

            const userResult = await pool.query(userQuery, [username])
            const adminResult = await pool.query(adminQuery, [username])

            const userLogin = userResult.rows[0] || adminResult.rows[0]
            
            // Check if the account exists
            if (!userLogin) {
                return res.status(401).json({ 
                    message: 'This username doesn\'t exist.' 
                })
            }

            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(password, userLogin.password)

            if (!isMatch) {
                return res.status(401).json({ 
                    message: 'Password is incorrect.' 
                })
            }

            // Add user's cart into session if it's a user
            if (userResult.rows.length > 0) {
                req.session.cart = userLogin.cart
            }

            // Generate a JWT token
            const token = jwt.sign({
                id: userLogin.id,
                username: userLogin.username,
                name: userLogin.name, 
                email: userLogin.email, 
                phonenumber: userLogin.phonenumber, 
                role: userLogin.role
            }, process.env.SECRET_KEY, { expiresIn: '1h' })

            // Store variables in session
            req.session.loginPassed = true
            req.session.token = token
            req.session.userLoginId = userLogin.id
            req.session.userLoginRole = userLogin.role

            // Respond with success and user information
            res.status(200).json({
                message: 'Login successful',
                token: token,
                user: {
                    id: userLogin.id,
                    username: userLogin.username,
                    name: userLogin.name, 
                    email: userLogin.email, 
                    phonenumber: userLogin.phonenumber, 
                    role: userLogin.role
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LoginController