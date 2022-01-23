// const { request, response } = require('express')
const Project = require('../models/project')

const projectsController = {

  async addProject(request, response) {
    // Register the user in the database

    try{
      const data = request.body

      const project = new Project({
        name: data.name,
        description: data.description,
        email: data.email,
        contactPerson: data.contactPerson,
        interestRate: data.interestRate,
        term: data.term,
        motto: data.motto,
        contactNumber: data.contactNumber,
        raisedMoney: {
          amount: data.raisedMoney.amount,
          currency: data.raisedMoney.currency,
        },
        preCommittedMoney: {
          amount: data.preCommittedMoney.amount,
          currency: data.preCommittedMoney.currency,
        },
        targetAmountOfMoney: {
          amount: data.targetAmountOfMoney.amount,
          currency: data.targetAmountOfMoney.currency,
        },
        valuation: {
          amount: data.valuation.amount,
          currency: data.valuation.currency,
        },
        sharePrice: {
          amount: data.sharePrice.amount,
          currency: data.sharePrice.currency,
        },
        tags: data.tags,
        location: data.location,
        img: '',
      })


      const createdProject = await project.save()
      response.status(201).json({ message: 'Successfully added project!', createdProject })

    }catch(err){
      response
        .status(400)
        .send({ message: 'Bad Request!', err })
    }
  },


  async getAllProjects(request, response){

    try{

      const projects = await Project.find({})
      response
        .status(200)
        .send(projects)

    }catch(err){
      response
        .status(400)
        .send({ message: 'Bad Request!', err })
    }
  },

  async retrieveProject(request, response){

    try{

      const currentProjectID = request.params.project_id
      const project = await Project.findById(currentProjectID)

      if (!project){
        return response
          .status(404)
          .send({ message: 'Project not found!' })
      }

      response
        .status(200)
        .send(project)

    }
    catch(err){
      response
        .status(400)
        .send({ message: 'Bad Request!', err })
    }
  }

}


module.exports = projectsController