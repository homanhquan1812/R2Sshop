const loginRouter = require('./login')
const registerRouter = require('./register')
const courseRouter = require('./course')

function route(app) {
    app.use('/course', courseRouter)
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).json({ 
            message: 'Something went wrong!'
        })
    })
}

module.exports = route