const bcrypt = require('bcrypt')
const Users = require('../model/Users')
const Admins = require('../model/Admins')
const jwt = require('jsonwebtoken')

class LoginController
{
    // [POST] /login
    async login(req, res, next) {
        req.session.loginPassed = false

        const { username, password } = req.body

        try {
            // Find a user/admin
            const userMatch = await Users.findOne({ username: username })
            const adminMatch = await Admins.findOne({ username: username })
            
            if (!userMatch && !adminMatch) {
                return res.status(401).json({
                    message: 'This username doesn\'t exists.'
                })
            }

            // User username found
            if (userMatch) {
                // Check user's password
                const isMatch = await bcrypt.compare(password, userMatch.password)

                if (!isMatch) {
                    return res.status(401).json({
                        message: 'Password is incorrect.'
                    })
                }

                const token = jwt.sign({ id: userMatch._id, username: userMatch.username, name: userMatch.name, role: userMatch.role, }, process.env.SECRET_KEY, { expiresIn: '1h' })

                req.session.loginPassed = true

                // Send JWT token and user info as JSON response
                res.json({
                    message: 'Login successful',
                    token: token,
                    user: {
                        id: userMatch._id,
                        username: userMatch.username,
                        name: userMatch.name,
                        role: userMatch.role
                    }
                })
            } 
            // Admin username found
            else if (adminMatch) {
                // Check admin's password
                const isMatch = await bcrypt.compare(password, adminMatch.password)

                if (!isMatch) {
                    return res.status(401).json({
                        message: 'Password is incorrect.'
                    })
                }

                const token = jwt.sign({ id: adminMatch._id, username: adminMatch.username, name: adminMatch.name, role: adminMatch.role, }, process.env.SECRET_KEY, { expiresIn: '1h' })

                req.session.loginPassed = true

                // Send JWT token and user info as JSON response
                res.json({
                    message: 'Login successful',
                    token: token,
                    user: {
                        id: adminMatch._id,
                        username: adminMatch.username,
                        name: adminMatch.name,
                        name: adminMatch.role
                    }
                })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LoginController