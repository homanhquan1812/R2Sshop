require('dotenv').config()

const bcrypt = require('bcrypt')
const Users = require('../model/Users')
const Admins = require('../model/Admins')

class RegisterController
{
    // [POST] /register
    async register(req, res, next)
    {
        try {
            const { name, username, password, key, email, phonenumber } = req.body
            const userCheck = await Users.findOne({ username: username })
            const adminCheck = await Admins.findOne({ username: username })

            // Account must be unique
            if (userCheck || adminCheck) {
                return res.status(401).json('This username already exists.')
            }

            // User register
            if (key == null || key != process.env.STAFF_KEY) {
                // Hashing + Salting
                const saltRounds = 10 // Min: 10 = Enough, Max: 12 = Slower performance but better security
                const hashedPassword = await bcrypt.hash(password, saltRounds)
                // User role
                const role = 'User'
                const newUser = new Users({ name, username, password: hashedPassword, role, email, phonenumber })
                await newUser.save()

                res.status(201).json('User registered successfully.')
            } 
            // Admin register
            else if (key == process.env.STAFF_KEY) {
                const saltRounds = 10 // Min: 10 = Enough, Max: 12 = Slower performance but better security
                const hashedPassword = await bcrypt.hash(password, saltRounds)
                // Admin role
                const role = 'Admin'
                const newUser = new Admins({ name, username, password: hashedPassword, role, email, phonenumber })
                await newUser.save()

                res.status(201).json('Admin registered successfully.')
            }           
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new RegisterController