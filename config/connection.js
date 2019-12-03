const mysql = require('mysql'),
    {
        DATABASE_HOST,
        DATABASE_NAME,
        DATABASE_USER,
        DATABASE_PASSWORD
    } = require('./environment'),
    connection = mysql.createConnection({
        host: DATABASE_HOST,
        database: DATABASE_NAME,
        user: DATABASE_USER,
        password: DATABASE_PASSWORD
    })

module.exports = connection