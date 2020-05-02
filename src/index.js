const express = require('express')
const bodyParse = require("body-parser")

const app = express()

const routes = require('./routes')

app.use(express.static('public'))
app.use(bodyParse.urlencoded({ extended: true }))
app.use(routes)

app.listen(3333, () => console.log(`Server iniciado... http://localhost:3333`))
