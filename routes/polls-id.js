const db = require('../models/database.js');
const pollsDb = require('../models/polls.js');
//handler to retrieve a poll by id
module.exports = function (req, res, next){
    let user = global.debug ? {name: "Carl"} : req.user;
    let id = req.params.id;
    pollsDb.getById(id, (err, poll) =>{
        if(err){
            console.log(err);            
        } else {
             res.render('poll', {
                                    user: user.name, 
                                    id: poll._id,
                                    name: poll.name,
                                    by: poll.by,
                                    pollOptions: poll.pollOptions 
            });
        }
    });             
};