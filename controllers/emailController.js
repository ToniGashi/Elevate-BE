const transporter = require("../nodemailer/transporter");

const emailController = {
    
    async inviteUserToProject(receiverEmail, sender, project) {
        let message = await transporter.sendMail({
            from: `"${sender.firstName} ${sender.lastName} 👻" <${sender.email}>`, // TODO: The senders email won't show because google overwrites it so we may want to switch to hotmail or something
            to: receiverEmail, // list of receivers
            subject: "Message Delivery Works ✔", // Subject line
            text: `Hello, you have been invited to this project: ${project.name}`, // plain text body
            html: `<b>Hello</b>. You have been invited to this project: ${project.name}`, // html body
        }); 

        console.log("Message sent: %s", message.messageId);
    },

    inviteUserToSite() {

    },

    async contact(reqBody) {
        let message = await transporter.sendMail({
            from: `"${reqBody.fullName} 👻" <${reqBody.email}>`, // TODO: The senders email won't show because google overwrites it so we may want to switch to hotmail or something
            to: process.env.NODEMAILER_EMAIL, // list of receivers
            subject: "Message Delivery Works ✔", // Subject line
            text: `${reqBody.message}`, // plain text body
        }); 

        console.log("Message sent: %s", message.messageId);
    }
}

module.exports = emailController;