const {
    JWT_SECRET_KEY,
    connection
} = require('../../config'),
    {
        hashPassword,
        comparePassword
    } = require('../../helpers'),
    jwt = require('jsonwebtoken')

module.exports = {
    getAll: (req, res) => {
        connection.query(
            'SELECT * FROM `users`;',
            (error, results, fields) => {
                if (error) {
                    res.status(500).send({
                        message: 'There is something error.'
                    })
                } else {
                    res.status(200).send({
                        message: 'Get all users.',
                        data: results
                    })
                }
            }
        )
    },
    login: (req, res) => {
        connection.query(
            'SELECT `id`, `firstName`, `lastName`, `password` FROM `users` WHERE `email` = ? LIMIT 1;',
            [req.body.email],
            async (error, results, fields) => {
                if (error) {
                    res.status(500).send({
                        message: 'There is something error.'
                    })
                } else {
                    if (results.length > 0) {
                        const id = results[0].id,
                            firstName = results[0].firstName,
                            lastName = results[0].lastName,
                            password = results[0].password,
                            decision = await comparePassword(req.body.password, password)

                        if (decision) {
                            const token = await jwt.sign(
                                {
                                    id,
                                    firstName,
                                    lastName
                                },
                                JWT_SECRET_KEY,
                                {
                                    expiresIn: '1d'
                                }
                            )

                            res.send({
                                token
                            })
                        } else {
                            res.send({
                                message: 'Email or password is wrong!'
                            })
                        }
                    } else {
                        res.send({
                            message: 'Email or password is wrong!'
                        })
                    }
                }
            }
        )
    },
    signUp: (req, res) => {
        connection.query(
            'SELECT * FROM `users` WHERE `email` = ?;',
            [req.body.email],
            async (error, results, fields) => {
                if (error) {
                    res.status(500).send({
                        message: 'There is something error.'
                    })
                } else {
                    if (results.length > 0) {
                        res.send({
                            message: 'Email have been used!'
                        })
                    } else {
                        const firstName = req.body.firstName,
                            lastName = req.body.lastName,
                            email = req.body.email,
                            password = await hashPassword(req.body.password)

                        connection.query(
                            'INSERT INTO `users` VALUES(NULL, ?, ?, ?, ?)',
                            [firstName, lastName, email, password],
                            (error, results, fields) => {
                                if (error) {
                                    res.status(500).send({
                                        message: 'There is something error.'
                                    })
                                } else {
                                    res.send({
                                        message: 'User is successfully added.'
                                    })
                                }
                            }
                        )
                    }
                }
            }
        )
    }
}