const express = require('express');
const router = express.Router();

const users = [{id:1, name: 'John', email: 'john@gmail.com'}];

router.get('/', (req, res) => {
    res.json({ok: true, userList: users});
})

router.get('/:id', (req, res) => {
    const userName = req.params;
    const requestedUser = users.filter(user => user.id == userName.id)
    res.json(requestedUser);
})

router.post('/addUser', (req, res) => {
    const {name, email} = req.body;
    console.log(name," and ", email);
    if(name && email){
        if(users)
            users.push({name: name, email: email});
        res.status(200).send('Request Complete');
    }
    else
        res.status(400).send('All fields are required.');
})

module.exports = router;