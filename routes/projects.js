const express = require('express')
const projectsRouter = express.Router()
var projectsController = require('../controllers/projectsController.js')



// Endpoint to add a project
projectsRouter.post('/projects', (req, res) => {
  projectsController.addProject(req,res)
})


// Endpoint to retrieve all projects
projectsRouter.get('/projects', (req, res) => {
  projectsController.getAllProjects(req,res)
})

// Endpoint to retrieve single project by id
projectsRouter.get('/projects/:project_id', (req, res) => {
  projectsController.retrieveProject(req,res)
})


module.exports = projectsRouter