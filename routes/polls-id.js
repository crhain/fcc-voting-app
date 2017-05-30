//handler to retrieve a poll by id
module.exports = function (req, res, next){
    let user = global.debug ? 'default' : req.user;
    var id = req.params.id;    
    res.render('poll', {user, _id: id, name: global.polls.find((poll)=>{
            return poll._id === id;
        }).name
    });
}