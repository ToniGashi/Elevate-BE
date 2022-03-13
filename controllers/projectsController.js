// const { request, response } = require('express')
const Project = require('../models/project')

const projectsController = {

  async addProject(request, response) {
    // Register the user in the database

    try{
      const data = request.body

      const project = new Project({
        ...data
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