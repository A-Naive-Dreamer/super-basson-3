const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    {
        PORT,
        JWT_SECRET_KEY,
        connection
    } = require('./config'),
    jwt = require('express-jwt')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
    jwt({ secret: JWT_SECRET_KEY }).unless({
        path: [
            {
                url: '/',
                method: ['GET']
            },
            {
                url: '/users/log-in',
                method: ['POST']
            },
            {
                url: '/users/sign-up',
                method: ['POST']
            }
        ]
    })
)
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({
            message: 'You are not allowed to enter this endpoints.'
        })
    }

    next()
})

app.use('/todos', require('./routes/todos'))
app.use('/users', require('./routes/users'))

app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to my SQL API.'
    })
})

connection.connect((err) => {
    if (err) {
        console.log(`Error connecting: ${err.stack}`)

        return null
    }

    console.log('Connected to database.')
})

app.listen(PORT, () => {
    console.log(`This app is listening on port ${PORT}.`)
})