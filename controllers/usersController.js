const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const { request, response } = require('express')
const User = require('../models/user')

const usersController = {

  async registerUser(request, response) {
    // Register the user in the database

    try{


      const data = request.body
      const saltRounds = 10

      const passwordHash = await bcrypt.hash(data.password, saltRounds)

      const user = new User({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        passwordHash,
      })

      const createdUser = await user.save()
      response.status(201).json({ message: 'Successfully registered User!', user: createdUser })
    }catch(err){
      response
        .status(400)
        .send({ message: 'Bad Request!', err })
    }
  },

  async loginUser(request, response) {
    // Login the user with the credentials

    const body = request.body
    const user = await User.findOne({ email: body.email })
    const passCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

    if(! (user && passCorrect) ){
      return response.status(401).json({
        error: 'Invalid email or password!'
      })
    }
    const userForToken = {
      email: user.email,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
      .status(200)
      .send({ token, user: user })
  },

  async getAllUsers(request, response){

    try{
      const users = await User.find({})
      response
        .status(200)
        .send(users)
    }catch(err){
      response
        .status(400)
        .send({ message: 'Bad Request!', err })
    }

  },

  async retrieveUser(request, response){

    try{

      const currentUserID = request.params.user_id
      const user_object = await User.findById(currentUserID)

      if (!user_object){
        return response
          .status(404)
          .send({ message: 'User not found!' })
      }

      return response
        .status(200)
        .send(user_object)

    }
    catch(err){
      response
        .status(400)
        .send({ message: 'Bad Request!', err })
    }
  }

}


module.exports = usersController