const router = require('express').Router()

router.get('/', require('./controller').getAll)
router.post('/log-in', require('./controller').login)
router.post('/sign-up', require('./controller').signUp)

module.exports = router