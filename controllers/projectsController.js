// const { request, response } = require('express')
const Project = require('../models/project')

const projectsController = {

  async addProject(request, response) {
    // Register the user in the database

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
    // console.log(createdProject)
    response.status(201).json({ message: 'Successfully added project!', createdProject })
  },


  async getAllProjects(request, response){

    const projects = await Project.find({})
    response
      .status(200)
      .send(projects)
  }

}


module.exports = projectsController