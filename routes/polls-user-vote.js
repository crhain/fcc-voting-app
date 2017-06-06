const express = require('express');
const db = require('../models/database.js');
const router = express.Router();
const pollsDb = require('../models/polls.js');

//handle /polls/vote/:id : votes for poll option
router.post('/:id', (req, res, next) => {
    let user = global.debug.on ? global.debug.getUser() : req.user;
    let _Id = req.params.id;
    //let pollOptions = req.body.pollOptions;
    let option = req.body.option;
    let add = req.body.new;
    debug.log('voted for poll id: ' + _Id);
    debug.log('with item: ' + option);
    debug.log(add ? "This is a new item" : "This is not a new item");
    pollsDb.updatePollOption(_Id, option, add, (err, doc) =>{
        
        if(err){
            console.log(err);
            res.end(JSON.stringify({error: err}));
        } else {
             let poll = doc.value;
             poll.add = add;             
             debug.log('poll updated with...'); 
             debug.log(poll);
             res.end(JSON.stringify(poll));            
        }
    });


    //send on succesful vote
    //res.sendStatus(200);    
});

module.exports = router;