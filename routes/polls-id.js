const db = require('../database.js');
//handler to retrieve a poll by id
module.exports = function (req, res, next){
    let user = global.debug ? {name: "Carl"} : req.user;
    var id = req.params.id;
    let collection = db.get().collection('polls');
    collection.findOne({_id: id}, (err, poll)=>{
        if(err){
            console.log(err);
        } else {
            res.render('poll', {
                                    user: user.name, 
                                    _id: poll._id,
                                    name: poll.name,
                                    by: poll.by,
                                    pollOptions: poll.pollOptions 
            });
        }        
    });             
};