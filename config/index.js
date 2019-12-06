const {
    PORT,
    JWT_SECRET_KEY
} = require('./environment'),
    connection = require('./connection')

module.exports = {
    PORT: PORT,
    JWT_SECRET_KEY: JWT_SECRET_KEY,
    connection: connection
}