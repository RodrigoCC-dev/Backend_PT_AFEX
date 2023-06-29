const { Album } = require('../../db/models/index')

async function index(req, res) {
  const videoList = await Album.findAll()
  res.status(200).json(videoList)
}

async function create(req, res) {

}

async function destroy(req, res) {
  const video = await Album.findByPk(req.params.id)
  if (video !== null) {
    await video.destroy()
    res.status(200).json({})
  } else{
    res.status(422).json({error: 'No existe el video a eliminar'})
  }
}

module.exports = {
  index,
  create,
  destroy
}
