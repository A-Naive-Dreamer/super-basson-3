const router = require('express').Router()

router.get('/', require('./controller').getAll)
router.get('/:userId', require('./controller').getById)
router.get('/completed/:userId', require('./controller').getCompleted)
router.get('/uncompleted/:userId', require('./controller').getUncompleted)
router.delete('/:userId/:id', require('./controller').deleteOne)
router.post('/:userId', require('./controller').addOne)
router.put('/:userId/:id', require('./controller').updateOne)
router.put('/completed/:userId/:id', require('./controller').setAsCompleted)

module.exports = router