const db = require('../models/database.js');
const pollsDb = require('../models/polls.js');
//handler to retrieve a poll by id
module.exports = function (req, res, next){
    let user = global.debug.on ? global.debug.getUser() : req.user;
    let id = req.params.id;
    pollsDb.getById(id, (err, poll) =>{
        if(err){
            console.log(err);            
        } else {
             res.render('poll', {
                                    user: user && user.name,
                                    owned: user && user.name === poll.by,
                                    id: poll._id,
                                    name: poll.name,
                                    by: poll.by,
                                    pollOptions: poll.pollOptions 
            });
        }
    });             
};