require('dotenv').config()

const bcrypt = require('bcrypt')
const Users = require('../model/Users')
const Admins = require('../model/Admins')
const jwt = require('jsonwebtoken')

class UpdateInfoController {
    async addCourse(req, res, next) {
        try {
            const { name, price, id, photo } = req.body
            
            let userMatch = await Users.findById(id)

            if (!userMatch) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }

            userMatch.cart.items.push({ name, price, photo })
            userMatch.cart.totalPrice += price

            await userMatch.save()

            // Generate a new JWT with updated details
            const newToken = jwt.sign({
                id: userMatch._id,
                username: userMatch.username, 
                name: userMatch.name, 
                email: userMatch.email, 
                phonenumber: userMatch.phonenumber, 
                role: userMatch.role,
                cart: {
                    items: userMatch.cart.items,
                    totalPrice: userMatch.cart.totalPrice
                }
            }, process.env.SECRET_KEY, { expiresIn: '1h' })

            res.status(201).json({
                message: "Course added to this user's cart successfully.",
                token: newToken
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteCourse(req, res, next) {
        try {
            const { userId, id } = req.params

            const user = await Users.findById(userId)

            if (!user) {
                return res.status(404).json({ 
                    message: 'User not found.' 
                })
            }
            
            user.cart.items = user.cart.items.filter(item => item._id.toString() !== id)
            user.cart.totalPrice = user.cart.items.reduce((total, item) => total + item.price, 0)
            
            await user.save()

            // Generate a new JWT with updated details
            const newToken = jwt.sign({
                id: user._id,
                username: user.username, 
                name: user.name, 
                email: user.email, 
                phonenumber: user.phonenumber, 
                role: user.role,
                cart: {
                    items: user.cart.items,
                    totalPrice: user.cart.totalPrice
                }
            }, process.env.SECRET_KEY, { expiresIn: '1h' })

            res.status(200).json({ 
                message: 'Course deleted from cart successfully.',
                token: newToken
            })
        } catch (error) {
            next(error)
        }
    }

    async updateInfo(req, res, next) {
        const { name } = req.body
        const token = req.headers.authorization.split(' ')[1]

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const id = decoded.id

            // User case
            let idMatch = await Users.findByIdAndUpdate(id, {
                name
            })

            if (!idMatch) {
                // Admin case
                idMatch = await Admins.findByIdAndUpdate(id, {
                    name
                })
            }

            if (!idMatch) {
                return res.status(404).json({
                    message: "This ID doesn't exist."
                })
            }

            // Generate a new JWT with updated details
            const newToken = jwt.sign({
                id: idMatch._id,
                username: idMatch.username,
                name: name,
                role: idMatch.role
            }, process.env.SECRET_KEY, { expiresIn: '1h' })

            res.status(200).json({
                message: "Name updated successfully.",
                name: name,
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

            // User case
            let user = await Users.findById(id)

            if (!user) {
                // Admin case
                user = await Admins.findById(id)
            }

            if (!user) {
                return res.status(404).json({
                    message: "This ID doesn't exist."
                })
            }

            const passwordMatch = await bcrypt.compare(oldPassword, user.password)
            if (!passwordMatch) {
                return res.status(401).json({
                    message: 'Old password is incorrect.'
                })
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10)
            user.password = hashedPassword
            
            await user.save()

            res.status(200).json({
                message: 'Password updated successfully.'
            })
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UpdateInfoController