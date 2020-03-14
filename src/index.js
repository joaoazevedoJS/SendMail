const express = require('express')
const bodyParse = require("body-parser")
const nodemailer = require('nodemailer')
const config = require("./config/emailConfig.json")
const nunjucks = require('nunjucks')

const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(bodyParse.urlencoded({ extended: true }))

nunjucks.configure('./', {
    express: app,
    noCache: true,
})

app.get('/', (req, res) => {
    res.render('./public/index.html')
})

app.post('/', (req, res) => {
    const { email, subject, message } = req.body

    const { host, port, auth } = config
    const { user } = auth

    const transporter = nodemailer.createTransport({
        host,
        port,
        auth
    })

    const SendMessage = {
        from: user,
        to: email,
        subject,
        text: `${message}\n\n\n\n Date ${new Date()}`
    }

    transporter.sendMail(SendMessage)

    return res.redirect('/')
})

app.listen(8080, () => console.log(`Server iniciado... http://localhost:8080`))