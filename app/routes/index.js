const router = require('express').Router()
const album = require('./album')

router.use('/album', album)

module.exports = router
