const nodemailer = require('nodemailer')

const config = require("../Smtp/config.json")

module.exports = {
  store(req, res) {
    const { email, subject, message } = req.body

    if(!email || !subject || !message) {
      return res.status(204).send("Sem conteúdo")
    }

    // Smtp config
    const { host, port, auth } = config

    const transport = nodemailer.createTransport({
      host,
      port,
      auth
    })

    const mail = {
      from: auth.user,
      to: email,
      subject,
      text: `${message} \n\n\n\nEnviado em: ${new Date()}`
    }

    transport.sendMail(mail)

    return res.redirect('/')
  }
}
