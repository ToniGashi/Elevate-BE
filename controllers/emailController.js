const transporter = require('../nodemailer/transporter')

function checkRequirements() {
  if(!process.env.GMAIL)
    throw 'GMAIL not set in the environment vars.'
  if(!process.env.GMAIL_CLIENT_ID)
    throw 'GMAIL_CLIENT_ID not set in the environment vars.'
  if(!process.env.GMAIL_CLIENT_SECRET)
    throw 'GMAIL_CLIENT_SECRET not set in the environment vars.'
  if(!process.env.GMAIL_REFRESH_TOKEN)
    throw 'GMAIL_REFRESH_TOKEN not set in the environment vars.'
}

const emailController = {

  async inviteUserToProject(receiverEmail, sender, project) {
    checkRequirements()
    let message = await transporter.sendMail({
      from: `"${sender.firstName} ${sender.lastName} 👻" <${sender.email}>`, // TODO: The senders email won't show because google overwrites it so we may want to switch to hotmail or something
      to: receiverEmail, // list of receivers
      subject: 'Message Delivery Works ✔', // Subject line
      text: `Hello, you have been invited to this project: ${project.name}`, // plain text body
      html: `<b>Hello</b>. You have been invited to this project: ${project.name}`, // html body
    })

    console.log('Message sent: %s', message.messageId)
  },

  inviteUserToSite() {

  },

  async contact(request, response) {
    try {
      checkRequirements()
      let message = await transporter.sendMail({
        from: `"GreenFunds 👻" <${process.env.NODEMAILER_EMAIL}>`, // TODO: The senders email won't show because google overwrites it so we may want to switch to hotmail or something
        to: request.body.email, // list of receivers
        subject: 'Message Delivery Works ✔', // Subject line
        text: `"${request.body.message}"\nWe have received this message from you. Thank you so much for your inquiry! We will make sure to get to it as soon as possible.`, // plain text body
      })
      response.status(200).json({ message: 'Successfully sent email!' })
    } catch(err) {
      console.log('[ERROR]: ', err);
      response
        .status(400)
        .send({ message: 'Bad Request!', err })
    }
  }
}

module.exports = emailController
