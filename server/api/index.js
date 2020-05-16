const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

router.use('/upload', require('../upload'))
router.use('/queries', require('./queries'))
router.use('/parse', require('./parse'))
router.use('/tables', require('./tables'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
