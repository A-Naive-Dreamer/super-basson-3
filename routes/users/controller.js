const { connection } = require('../../config')

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
            'SELECT `id`, `firstName`, `lastName` FROM `users` WHERE `email` = ? AND `password` = ? LIMIT 1;',
            [req.body.email, req.body.password],
            (error, results, fields) => {
                console.log(results)
                if (results.length > 0) {
                    res.send({
                        id: results[0].id,
                        firstName: results[0].firstName,
                        lastName: results[0].lastName
                    })
                } else {
                    res.send({
                        message: 'Email or password is wrong!'
                    })
                }
            }
        )
    },
    signUp: (req, res) => {
        connection.query(
            'SELECT * FROM `users` WHERE `email` = ?;',
            [req.body.email],
            (error, results, fields) => {
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
                        connection.query(
                            'INSERT INTO `users` VALUES(NULL, ?, ?, ?, ?)',
                            [req.body.firstName, req.body.lastName, req.body.email, req.body.password],
                            (error, results, fields) => {
                                res.send({
                                    message: 'User is successfully added.'
                                })
                            }
                        )
                    }
                }
            }
        )
    }
}