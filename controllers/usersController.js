let users = [{id:'1', name: 'John', email: 'john@gmail.com'}];

const usersController = {
        async createUsers(req, res) {
            const {id, name, email} = req.body;
            if(name && email){
                if(users)
                    users.push({id:id, name: name, email: email});
                res.status(200).send('Request Complete');
            }
            else
                res.status(400).send('All fields are required.');
        },
        
        async deleteUser(req, res) {
            let toKeepUsers = users.filter(user => user.id != req.params.id);
            users=toKeepUsers;
            res.json(users);
        },
        
        async getAllUsers(req, res) {
            res.json({ok: true, userList: users});
        },
        
        async getUser(req, res) {
            const userToGet = req.params;
            const requestedUser = users.filter(user => user.id == userToGet.id)
            res.json(requestedUser);
        },
        
        async updateUser(req, res) {
            let arr = users.filter(user => {
                const newU = req.body;
                if(user.id == req.params.id) {
                    user = {...user, ...newU}
                    res.status(200).send(user);
                }
            });
            if(arr.length == 0) {
                res.status(403).send('No user with such ID');
            }
        },
}

// async function asyncHandler(fn) {
//     // Because express can't deal with async middleware
//     return (req, res, next) => {
//         fn(req, res, next).catch(next);
//     };
// }
//module.exports.function = asyncHandler(function);

module.exports = usersController;