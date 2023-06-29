const { Album } = require('../../db/models/index')

async function index(req, res) {
  const videoList = await Album.findAll()
  res.status(200).json(videoList)
}

async function create(req, res) {

}

async function destroy(req, res) {

}

module.exports = {
  index,
  create,
  destroy
}
