const nodemailer = require('nodemailer')


let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: { // TODO: google uses this to override sender email
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS
  },
})

module.exports = transporter
