require('dotenv').config()

const Orders = require('../model/Orders')
const Users = require('../model/Users')
const jwt = require('jsonwebtoken')
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')

class OrderController
{
    /*
     * 1. Show all orders
    */
    // [GET] /orders
    async getAllOrders(req, res, next)
    {
        try {
            const orders = await Orders.find({})

            res.status(200).json({
                orders: multipleMongooseToObject(orders)
            })
        } catch (error) {
            next(error)
        }
    }
    /*
     * 2. Add an order
    */
    // [POST] /orders
    async createAnOrder(req, res, next)
    {
        try {        
            const { name, email, phone, cart, status, id } = req.body

            const newOrder = new Orders(req.body)
            await newOrder.save()

            let userMatch = await Users.findById(id)

            if (!userMatch) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }

            // Reset the cart
            userMatch.cart.items = []
            userMatch.cart.totalPrice = 0

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
}

module.exports = new OrderController