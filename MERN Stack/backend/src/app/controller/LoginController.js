const bcrypt = require('bcrypt')
const Users = require('../model/Users')
const Admins = require('../model/Admins')
const jwt = require('jsonwebtoken')

class LoginController
{
    // [POST] /login
    async login(req, res, next) {
        // For Express rate limit
        req.session.loginPassed = false

        const { username, password } = req.body

        try {
            // Find a user/admin
            const userMatch = await Users.findOne({ username: username })
            const adminMatch = await Admins.findOne({ username: username })
            const userLogin = userMatch || adminMatch
            
            // Check if account exists
            if (!userLogin) {
                return res.status(401).json({
                    message: 'This username doesn\'t exist.'
                })
            }

            // Check password
            const isMatch = await bcrypt.compare(password, userLogin.password)

            if (!isMatch) {
                return res.status(401).json({
                    message: 'Password is incorrect.'
                })
            }

            // Add user's cart into session
            if (userMatch) {
                req.session.cart = userMatch.cart
            }

            const token = jwt.sign({
                id: userLogin.id,
                username: userLogin.username,
                name: userLogin.name, 
                email: userLogin.email, 
                phonenumber: userLogin.phonenumber, 
                role: userLogin.role
            }, process.env.SECRET_KEY, { expiresIn: '1h' })

            // Store variables for session
            req.session.loginPassed = true
            req.session.token = token

            req.session.userLoginId = userLogin.id
            req.session.userLoginRole = userLogin.role

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

            /* Old method got JWT size issue
            // User username found
            if (userMatch) {
                const cartItems = userMatch.cart.items.map(item => ({
                    id: item._id,
                    name: item.name, 
                    price: item.price,
                    photo: item.photo
                }))

                const token = jwt.sign({
                    id: userMatch._id, 
                    username: userMatch.username, 
                    name: userMatch.name, 
                    email: userMatch.email, 
                    phonenumber: userMatch.phonenumber, 
                    role: userMatch.role,
                    cart: {
                        items: cartItems,
                        totalPrice: userMatch.cart.totalPrice
                    }
                }, process.env.SECRET_KEY, { expiresIn: '1h' })

                req.session.loginPassed = true

                // Send JWT token and user info as JSON response
                res.json({
                    message: 'Login successful',
                    token: token,
                    user: {
                        id: userMatch._id,
                        username: userMatch.username,
                        name: userMatch.name
                    }
                })
            } 
            // Admin username found
            else if (adminMatch) {
                const token = jwt.sign({
                    id: adminMatch._id, 
                    username: adminMatch.username, 
                    name: adminMatch.name, 
                    phonenumber: adminMatch.phonenumber,
                    email: adminMatch.email,
                    role: adminMatch.role
                }, process.env.SECRET_KEY, { expiresIn: '1h' })

                req.session.loginPassed = true

                // Send JWT token and user info as JSON response
                res.json({
                    message: 'Login successful',
                    token: token,
                    user: {
                        id: adminMatch._id,
                        username: adminMatch.username,
                        name: adminMatch.name
                    }
                })
            }
            */
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LoginController