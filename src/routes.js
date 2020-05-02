const { Router } = require('express')

const routes = Router()

const EmailController = require('./Controllers/EmailController')

// carregar página incial
routes.get('/', (req, res) => res.render('public'))

routes.post('/sendMail', EmailController.store)

module.exports = routes
