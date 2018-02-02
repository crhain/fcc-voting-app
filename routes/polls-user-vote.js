const express           = require('express');
const db                = require('../models/database.js');
const router            = express.Router();
const pollsDb           = require('../models/polls.js');
const votesDb           = require('../models/votes.js');

//handle /polls/vote/:id : votes for poll option
router.post('/:id', (req, res, next) => {
    let user = global.debug.getUser(); 
    if(user === undefined){
        user = req.user;
    }
    let _Id = req.params.id;
    //let pollOptions = req.body.pollOptions;
    let option = req.body.option;
    let add = req.body.new;
    let voter = user;//req.body.voter;
    debug.log('voter: ' + voter);
    debug.log('voted for poll id: ' + _Id);
    debug.log('with item: ' + option);
    debug.log(add ? "This is a new item" : "This is not a new item");
    //add check against vote database to see if user can vote
    //if they can, then call updatePollOption
    votesDb.findVoter(_Id, voter, (err, vote) => {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            debug.log('Vote found: ');
            debug.log(vote);
            if(vote && !debug.canMultivote()){
                console.log('cannot vote');                
                res.end(JSON.stringify({voted: true}));
            } else {
                pollsDb.updatePollOption(_Id, option, add, (err, doc) =>{ 
                    if(err){
                        console.log(err);
                        res.end(JSON.stringify({error: err}));
                        // res.send(err);
                    } else {
                        let poll = doc.value;
                        poll.add = add;             
                        debug.log('poll updated with...'); 
                        debug.log(poll);
                        //update votes database
                        votesDb.addVote(_Id, voter);
                        //return json string with updated poll info
                        res.end(JSON.stringify(poll));
                        // res.redirect("/polls/" + _Id);            
                        
                    }
                });
            }
            
        }

        
    });

    


    //send on succesful vote
    //res.sendStatus(200);    
});

module.exports = router;