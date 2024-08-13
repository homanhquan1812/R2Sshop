require('dotenv').config()

const loginRouter = require('./login')
const registerRouter = require('./register')
const courseRouter = require('./course')
const updateInfoRouter = require('./updateinfo')
const orderRouter = require('./order')

function route(app) {
    app.use('/course', courseRouter)
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use(`/${process.env.API_KEY_2}`, updateInfoRouter)
    app.use('/order', orderRouter)

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).json({ 
            message: 'Something went wrong!'
        })
    })
}

module.exports = route