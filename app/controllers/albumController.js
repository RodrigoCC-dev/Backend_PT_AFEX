const { Video, Description } = require('../../db/models/index')

async function index(req, res) {
  const videoList = await Video.findAll({include: [{model: Description, required: true}]})
  res.status(200).json(videoList)
}

async function create(req, res) {
  const newReg = Video.build({
    videoId: req.body.videoId,
    title: req.body.title,
    thumbUrl: req.body.thumbUrl,
    duration: req.body.duration
  })
  try {
    await newReg.save()
    const descriptionList = cutDescription(req.body.description)
    descriptionList.forEach(async (item) => {
      await Description.create({
        partNumber: item.number,
        description: item.text,
        videoId: newReg.id
      })
    });
    res.status(200).json({})
  } catch (e) {
    console.error(e)
    res.status(422).json({error: 'No fue posible guardar el video'})
  }
}

async function destroy(req, res) {
  const video = await Video.findByPk(req.params.id)
  if (video !== null) {
    const descriptionList = await video.getDescriptions()
    descriptionList.forEach(async (item) => {
      await item.destroy()
    });
    await video.destroy()
    res.status(200).json({})
  } else{
    res.status(422).json({error: 'No existe el video a eliminar'})
  }
}

function cutDescription(desc) {
  let list = []
  const parts = (desc.length - (desc.length % 1234)) / 1234
  let aux = ''
  for (let i = 1; i <= parts; i++) {
    aux = desc.substring((i - 1)*1234, i*1234 - 1)
    const part = {number: i, text: aux}
    list.push(part)
  }
  aux = desc.substring(parts*1234, desc.length)
  list.push({number: (parts + 1), text: aux})
  return list
}

module.exports = {
  index,
  create,
  destroy
}
