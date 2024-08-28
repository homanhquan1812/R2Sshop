require('dotenv').config()

const bcrypt = require('bcrypt')
const { pool } = require('../../../config/db')
const jwt = require('jsonwebtoken')

class UpdateInfoController {
    async getCart(req, res, next) {
        try {
            const id = req.params.id
            const query = 'SELECT cart FROM users WHERE id = $1'
            const result = await pool.query(query, [id])

            if (result.rows.length === 0) {
                return res.status(404).json({ 
                    message: 'User not found.'
                })
            }

            res.status(200).json({
                id: id,
                cart: result.rows[0].cart
            })
        } catch (error) {
            next(error)
        }
    }

    async addCourse(req, res, next) {
        try {
            const { name, price, id, photo, courseId } = req.body

            const userQuery = 'SELECT * FROM users WHERE id = $1'
            const userResult = await pool.query(userQuery, [id])

            if (userResult.rows.length === 0) {
                return res.status(404).json('User not found.')
            }

            const user = userResult.rows[0]
            const newItems = [...user.cart.items, { name, price, photo, courseId }]
            const newTotalPrice = user.cart.totalPrice + price

            const updateQuery = `
                UPDATE users
                SET cart = $1
                WHERE id = $2
            `
            await pool.query(updateQuery, [{ items: newItems, totalPrice: newTotalPrice }, id])

            res.status(201).json("Course added to this user's cart successfully.")

        } catch (error) {
            next(error)
        }
    }

    async deleteCourse(req, res, next) {
        try {
            const { userId, id } = req.params

            const userQuery = 'SELECT * FROM users WHERE id = $1'
            const userResult = await pool.query(userQuery, [userId])

            if (userResult.rows.length === 0) {
                return res.status(404).json('User not found.')
            }

            const cart = userResult.rows[0].cart
            const updatedItems = cart.items.filter(item => item.courseId !== id)
            const newTotalPrice = updatedItems.reduce((total, item) => total + item.price, 0)

            const updateQuery = `
                UPDATE users
                SET cart = $1
                WHERE id = $2
            `
            await pool.query(updateQuery, [{ items: updatedItems, totalPrice: newTotalPrice }, userId])

            res.status(200).json('Course deleted from cart successfully.')
        } catch (error) {
            next(error)
        }
    }

    async updateInfo(req, res, next) {
        const { name, email, phonenumber } = req.body
        const token = req.headers.authorization.split(' ')[1]

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const id = decoded.id

            // Update user's information
            const updateUserQuery = `
                UPDATE users
                SET name = $1, email = $2, phonenumber = $3
                WHERE id = $4
                RETURNING *
            `
            const updateAdminQuery = `
                UPDATE admins
                SET name = $1, email = $2, phonenumber = $3
                WHERE id = $4
                RETURNING *
            `
            let result = await pool.query(updateUserQuery, [name, email, phonenumber, id])

            if (result.rows.length === 0) {
                result = await pool.query(updateAdminQuery, [name, email, phonenumber, id])
            }

            if (result.rows.length === 0) {
                return res.status(404).json({ message: "This ID doesn't exist." })
            }

            const updatedUser = result.rows[0]

            // Generate a new JWT with updated details
            const newToken = jwt.sign({
                id: updatedUser.id,
                username: updatedUser.username,
                name: updatedUser.name,
                email: updatedUser.email,
                phonenumber: updatedUser.phonenumber,
                role: updatedUser.role
            }, process.env.SECRET_KEY, { expiresIn: '1h' })

            res.status(200).json({
                message: "Information updated successfully.",
                name: updatedUser.name,
                email: updatedUser.email,
                phonenumber: updatedUser.phonenumber,
                token: newToken
            })
            
        } catch (error) {
            next(error)
        }
    }

    //
    async updatePassword(req, res, next) {
        const { oldPassword, newPassword } = req.body
        const token = req.headers.authorization.split(' ')[1]

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const id = decoded.id

            // Query user or admin by ID
            const userQuery = 'SELECT * FROM users WHERE id = $1'
            const adminQuery = 'SELECT * FROM admins WHERE id = $1'

            let result = await pool.query(userQuery, [id])
            if (result.rows.length === 0) {
                result = await pool.query(adminQuery, [id])
            }

            if (result.rows.length === 0) {
                return res.status(404).json("This ID doesn't exist.")
            }

            const user = result.rows[0]

            const passwordMatch = await bcrypt.compare(oldPassword, user.password)

            if (!passwordMatch) {
                return res.status(401).json('Old password is incorrect.')
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10)

            const updatePasswordQuery = `
                UPDATE ${user.role === 'admin' ? 'admins' : 'users'}
                SET password = $1
                WHERE id = $2
            `
            await pool.query(updatePasswordQuery, [hashedPassword, id])

            res.status(200).json('Password updated successfully.')
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UpdateInfoController