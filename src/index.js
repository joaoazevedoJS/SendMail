const express = require('express')
const bodyParse = require("body-parser")
const nodemailer = require('nodemailer')

const app = express()

app.use(express.json())
app.use(bodyParse.urlencoded({ extended: true }))

app.post('/', (req, res) => {
    const { name, email, message, password } = req.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password,
        }
    })

    const SendMessage = {
        from: email,
        to: "yourEmail@...",
        subject: "Email With NodeJS",
        text: `Hello, I'm ${name}. \nMessage: ${message}.\n\n Date: ${new Date()}`
    }

    transporter.sendMail(SendMessage, function(error, info){
        if (error) {
            return res.json(error);
        } else {
            return res.json(`Email enviado: ${info.response}`);
        }
    })
})

app.listen(8080, () => console.log(`Server iniciado... https://localhost:8080`))