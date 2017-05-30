//handler to retrieve a poll by id
module.exports = function (req, res, next){
    let user = global.debug ? 'default' : req.user;
    var id = req.params.id;    
    var poll = global.polls.find((poll) => {
        return poll._id === id;
    });
    res.render('poll', {user, _id: id, 
                        name: poll.name,
                        pollOptions: poll.pollOptions
    });
}