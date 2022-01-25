
const transporter = require('../nodemailer/transporter')

const emailController = {
  // async inviteUserToProject(receiverEmail, sender, project) {
  //   checkRequirements()
  //   let message = await transporter.sendMail({
  //     from: `"${sender.firstName} ${sender.lastName} 👻" <${sender.email}>`, // TODO: The senders email won't show because google overwrites it so we may want to switch to hotmail or something
  //     to: receiverEmail, // list of receivers
  //     subject: 'Message Delivery Works ✔', // Subject line
  //     text: `Hello, you have been invited to this project: ${project.name}`, // plain text body
  //     html: `<b>Hello</b>. You have been invited to this project: ${project.name}`, // html body
  //   })

  //   console.log('Message sent: %s', message.messageId)
  // },

  // inviteUserToSite() {

  // },

  async contact(req, res) {
    try {
      const { email, message } = req.body
      if(!email || !message) {
        throw new Error('Bad request!')
      }

      let mail = await transporter.sendMail({
        from: `"GreenFunds 👻" <${process.env.NODEMAILER_EMAIL}>`,
        to: email, // list of receivers
        subject: 'Message Delivery Works ✔', // Subject line
        text: `"${message}"\nWe have received this message from you. Thank you so much for your inquiry! We will make sure to get to it as soon as possible.`, // plain text body
      })

      if(!mail.messageId) {
        throw new Error('There was a problem sending the mail')
      }

      res.status(200).send({ message: 'Successfully sent email!' })
    } catch (error) {
      res.status(400).send({
        error: { message: error.message }
      })
    }
  }
}

module.exports = emailController
