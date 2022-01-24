const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { // TODO: google uses this to override sender email
        user: process.env.NODEMAILER_EMAIL, 
        pass: process.env.NODEMAILER_PASS
    },
}); 

module.exports = transporter
