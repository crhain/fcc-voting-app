const express = require('express');
const db = require('../models/database.js');
const router = express.Router();
const pollsDb = require('../models/polls.js');
const votesDb = require('../models/votes.js');

//handle base route to /polls/user/delete/:id : deletes poll id
router.delete('/:id', (req, res, next) => {
   let user = global.debug.on ? global.debug.getUser() : req.user;
    let id = req.params.id;
    pollsDb.delete(id, (err, deleteRes) =>{
        if(err){ 
            console.log(err);             
        } else {
            debug.log('deleted doc id: ' + id);
            //on succesfull delete
            votesDb.delete(id);            
        }        
    });
    //redirect handled by client in poll-ui.js            
});

module.exports = router;