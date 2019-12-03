const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    { PORT, connection } = require('./config')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
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