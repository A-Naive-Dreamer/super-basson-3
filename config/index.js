const { PORT } = require('./environment'),
    connection = require('./connection')

module.exports = {
    PORT: PORT,
    connection: connection
}