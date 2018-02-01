const db        = require('../models/database.js');
const pollsDb   = require('../models/polls.js');
//handler to retrieve a poll by id
module.exports = function (req, res, next){
    let user = global.debug.getUser(); 
    if(user === undefined){
        user = req.user;
    }
    let id = req.params.id;
    let voter = user ? user.name : req.ip;
    pollsDb.getById(id, (err, poll) =>{
        if(err){
            console.log(err);                        
        } else {
             if(poll){
                res.render('poll/poll', {
                    user: user && user.name,
                    owned: user && user.name === poll.by,
                    voter: voter,
                    id: poll._id,
                    name: poll.name,
                    by: poll.by,
                    pollOptions: poll.pollOptions 
                });
             } else {
                 res.redirect('/');
             }
             
        }
    });             
};