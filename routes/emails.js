const express = require('express');
const emailRouter = express.Router();
var emailController = require('../controllers/emailController.js');

// emailRouter.get('/userToProject', (req, res) => {
//     console.log("fas");
//     let user = req.body.user;
//     let project = req.body.project
//     emailController.inviteUserToProject("tonigashi999@gmail.com", user, project);
// })

// emailRouter.get('/userToApp', (req, res) => {
//     emailController.inviteUserToProject("tonigashi999@gmail.com", user, project);
// })

emailRouter.post('/contact', (req, res) => {
    console.log(req.body);
    emailController.contact(req.body);
    res.status(200).send();
})

module.exports = emailRouter;
