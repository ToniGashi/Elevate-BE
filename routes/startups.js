const express = require('express')
const router = express.Router()
var startupsController = require('../controllers/startupsController.js')

router.get('/', (req, res) => {
  startupsController.getAllStartups(req,res)
})

router.get('/:id', (req, res) => {
  startupsController.getStartup(req,res)
})

router.post('/', (req, res) => {
  startupsController.createStartups(req,res)
})

router.put('/:id', (req, res) => {
  startupsController.updateStartup(req,res)
})

router.delete('/:id', (req, res) => {
  startupsController.deleteStartup(req,res)
})

module.exports = router