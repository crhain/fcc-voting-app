const express = require('express');
const db = require('../models/database.js');
const router = express.Router();
const pollsDb = require('../models/polls.js');

//handle /polls/vote/:id : votes for poll option
router.post('/:id', (req, res, next) => {
    let user = global.debug ? {name: "Carl"} : req.user;
    let _Id = req.params.id;
    //let poll = req.body.poll;
    let option = req.body.option;
    let add = req.body.new;
    console.log('voted for poll id: ' + _Id);
    console.log('with item: ' + option);
    console.log(add ? "This is a new item" : "This is not a new item");
    pollsDb.updatePollOption(_Id, option, add, (err, stuff) =>{
        if(err){
            console.log(err);
        } else {
             /*res.render('poll', {
                                    user: user && user.name, 
                                    id: _Id,
                                    name: poll.name,
                                    by: poll.by,
                                    pollOptions: poll.pollOptions 
            });*/
            console.log('poll updated');
        }
    });


    //send on succesful vote
    res.sendStatus(200);    
});

module.exports = router;