const router = require('express').Router()
const albumController = require('../controllers/albumController')

router.get('/', function (req, res) {
  albumController.index(req, res)
})

router.post('/', function (req, res) {
  albumController.create(req, res)
})

router.delete('/:id', function (req, res) {
  albumController.destroy(req, res)
})

module.exports = router
