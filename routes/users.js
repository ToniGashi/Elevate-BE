const express = require('express');
const router = express.Router();
var usersController = require('../controllers/usersController.js');

router.get('/', (req, res) => {
    usersController.getAllUsers(req,res);
})

router.get('/:id', (req, res) => {
    usersController.getUser(req,res);
})

router.post('/', (req, res) => {
    usersController.createUsers(req,res);
})

router.put('/:id', (req, res) => {
    usersController.updateUser(req,res);
})

router.delete('/:id', (req, res) => {
    usersController.deleteUser(req,res);
})

module.exports = router;