require('dotenv').config()

const bcrypt = require('bcrypt')
const { pool } = require('../../../config/db')

class RegisterController
{
    // [POST] /register
    async register(req, res, next)
    {
        try {
            const { name, username, password, key, email, phonenumber } = req.body
            const userCheckQuery = 'SELECT 1 FROM users WHERE username = $1 UNION ALL SELECT 1 FROM admins WHERE username = $1 LIMIT 1'
            const userCheckResult = await pool.query(userCheckQuery, [username])

            // Account must be unique
            if (userCheckResult.rowCount > 0) {
                return res.status(401).json('This username already exists.')
            }
            
            // Hashing + Salting
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(password, saltRounds)

            // User registration
            if (key == null || key !== process.env.STAFF_KEY) {
                const cart = { totalPrice: 0, items: [] }

                const registerUserQuery = `
                    INSERT INTO users (name, username, password, role, email, phonenumber, cart)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING id
                `
                const registerUserValues = [name, username, hashedPassword, 'User', email, phonenumber, JSON.stringify(cart)]
                await pool.query(registerUserQuery, registerUserValues)

                res.status(201).json('User registered successfully.')
            } 
            // Admin registration
            else if (key === process.env.STAFF_KEY) {
                const registerAdminQuery = `
                    INSERT INTO admins (name, username, password, role, email, phonenumber)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING id
                `
                const registerAdminValues = [name, username, hashedPassword, 'Admin', email, phonenumber]
                await pool.query(registerAdminQuery, registerAdminValues)

                res.status(201).json('Admin registered successfully.')
            }         
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new RegisterController