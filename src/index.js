const express = require('express')
const bodyParse = require("body-parser")
const nodemailer = require('nodemailer')
const config = require("./config/emailConfig.json")

const app = express()

app.use(express.json())
app.use(bodyParse.urlencoded({ extended: true }))

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

    transporter.sendMail(SendMessage, function (error, info) {
        if (error) {
            return res.json(error)
        }
        else {
            return res.json(`Email enviado: ${info.response}`)
        }
    })
})

app.listen(8080, () => console.log(`Server iniciado... https://localhost:8080`))