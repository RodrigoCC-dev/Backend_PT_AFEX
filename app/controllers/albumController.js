const { Album } = require('../../db/models/index')

async function index(req, res) {
  const videoList = await Album.findAll()
  res.status(200).json(videoList)
}

async function create(req, res) {
  console.log(req.body.videoId)
  console.log(req.body.title)
  const newReg = Album.build({
    videoId: req.body.videoId,
    title: req.body.title,
    description: req.body.description,
    thumbUrl: req.body.thumbUrl,
    duration: req.body.duration
  })
  try {
    await newReg.save()
    res.status(200).json({})
  } catch (e) {
    console.error(e)
    res.status(422).json({error: 'No fue posible guardar el video'})
  }
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
