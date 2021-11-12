const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { // TODO: google uses this to override sender email
        user: "usingthisfornodemailer@gmail.com", 
        pass: "%justatemppass"
    },
}); 

module.exports = transporter
