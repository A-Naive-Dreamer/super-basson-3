const { connection } = require('../../config')

module.exports = {
    getAll: (req, res) => {
        connection.query(
            'SELECT * FROM `todos`;',
            (error, results, fields) => {
                if (error) {
                    res.status(500).send({
                        message: 'There is something error.'
                    })
                } else {
                    res.status(200).send({
                        message: 'Get all datas.',
                        data: results
                    })
                }
            })
    },
    getById: (req, res) => {
        connection.query(
            'SELECT * FROM `todos` WHERE `user_id` = ?;',
            [parseInt(req.params.userId)],
            (error, results, fields) => {
                if (error) {
                    console.log(error)
                    res.status(500).send({
                        message: 'There is something error.'
                    })
                } else {
                    res.status(200).send({
                        message: 'Get data by id.',
                        data: results
                    })
                }
            })
    },
    getCompleted: (req, res) => {
        connection.query(
            'SELECT * FROM `todos` WHERE `status` = "completed" AND `user_id` = ?;',
            [parseInt(req.params.userId)],
            (error, results, fields) => {
                if (error) {
                    console.log(error)
                    res.status(500).send({
                        message: 'There is something error.'
                    })
                } else {
                    res.status(200).send({
                        message: 'Get completed data.',
                        data: results
                    })
                }
            })
    },
    getUncompleted: (req, res) => {
        connection.query(
            'SELECT * FROM `todos` WHERE `status` = "uncompleted" AND `user_id` = ?;',
            [parseInt(req.params.userId)],
            (error, results, fields) => {
                if (error) {
                    console.log(error)
                    res.status(500).send({
                        message: 'There is something error.'
                    })
                } else {
                    res.status(200).send({
                        message: 'Get uncompleted data.',
                        data: results
                    })
                }
            })
    },
    addOne: (req, res) => {
        connection.query(
            'INSERT INTO `todos` (`user_id`, `todo`, status) VALUES(?, ?, "uncompleted");',
            [req.params.userId, req.body.todo],
            (error, results, fields) => {
                if (error) {
                    console.log(error)
                    res.status(500).send({
                        message: 'There is something error.'
                    })
                } else {
                    connection.query(
                        'SELECT * FROM `todos` WHERE `user_id` = ?;',
                        [parseInt(req.params.userId)],
                        (error, results, fields) => {
                            if (error) {
                                res.status(500).send({
                                    message: 'There is something error.'
                                })
                            } else {
                                res.status(200).send({
                                    message: 'Get all datas.',
                                    data: results
                                })
                            }
                        }
                    )
                }
            })
    },
    updateOne: (req, res) => {
        connection.query(
            'UPDATE todos SET `todo` = ? WHERE `id` = ? AND `user_id` = ?',
            [req.body.todo, req.params.id, req.params.userId],
            (error, results, fields) => {
                if (error) {
                    console.log(error)

                    res.status(500).send({
                        message: 'There is something error.'
                    })
                } else {
                    connection.query(
                        'SELECT * FROM `todos` WHERE `user_id` = ?;',
                        [parseInt(req.params.userId)],
                        (error, results, fields) => {
                            if (error) {
                                res.status(500).send({
                                    message: 'There is something error.'
                                })
                            } else {
                                res.status(200).send({
                                    message: 'Get all datas.',
                                    data: results
                                })
                            }
                        }
                    )
                }
            }
        )
    },
    deleteOne: (req, res) => {
        connection.query(
            'UPDATE `todos` SET `status` = "deleted" WHERE `id` = ? AND `user_id` = ?;',
            [req.params.id, req.params.userId],
            (error, results, fields) => {
                if (error) {
                    console.log(error)

                    res.status(500).send({
                        message: 'There is something error.'
                    })
                } else {
                    connection.query(
                        'SELECT * FROM `todos` WHERE `user_id` = ?;',
                        [parseInt(req.params.userId)],
                        (error, results, fields) => {
                            if (error) {
                                res.status(500).send({
                                    message: 'There is something error.'
                                })
                            } else {
                                res.status(200).send({
                                    message: 'Data is successfully updated.',
                                    data: results
                                })
                            }
                        }
                    )
                }
            }
        )
    },
    setAsCompleted: (req, res) => {
        connection.query(
            'UPDATE `todos` SET `status` = "completed" WHERE `id` = ? AND `user_id` = ?;',
            [req.params.id, req.params.userId],
            (error, results, fields) => {
                if (error) {
                    console.log(error)

                    res.status(500).send({
                        message: 'There is something error.'
                    })
                } else {
                    connection.query(
                        'SELECT * FROM `todos` WHERE `user_id` = ?;',
                        [parseInt(req.params.userId)],
                        (error, results, fields) => {
                            if (error) {
                                res.status(500).send({
                                    message: 'There is something error.'
                                })
                            } else {
                                res.status(200).send({
                                    message: 'Data is successfully updated.',
                                    data: results
                                })
                            }
                        }
                    )
                }
            }
        )
    }
}