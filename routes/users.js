const express = require('express')
const userRouter = express.Router()
var usersController = require('../controllers/usersController.js')



// Endpoint to register the user
userRouter.post('/users', (req, res) => {
  usersController.registerUser(req,res)
})

// Endpoint to login the user (retrieve the token)
userRouter.post('/users/token', (req, res) => {
  usersController.loginUser(req,res)
})

// Endpoint to get all the users
userRouter.get('/users', (req, res) => {
  usersController.getAllUsers(req,res)
})

// Endpoint to retrieve one user by ID
userRouter.get('/users/:user_id', (req, res) => {
  usersController.retrieveUser(req,res)
})


module.exports = userRouter