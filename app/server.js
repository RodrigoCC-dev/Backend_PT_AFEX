const express = require('express')
const cors = require('cors')
require('dotenv').config()

let app = express()

let port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({origin: process.env.CORS_ORIGINS}))

const router = require('./routes')
app.use('/', router)

app.listen(port)
console.log('API escuchando en el puerto ' + port)
