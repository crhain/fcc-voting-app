const express               = require('express');
const db                    = require('../models/database.js');
const router                = express.Router();
const ensureAuthenticated   = require('../helpers/authenticate.js');
const pollsDb               = require('../models/polls.js');
const votesDb               = require('../models/votes.js');

//handle base route to /polls/user/delete/:id : deletes poll id
router.delete('/:id', ensureAuthenticated, (req, res, next) => {
    let user = global.debug.getUser(); 
    if(user === undefined){
        user = req.user;
    }
    let id = req.params.id;
    pollsDb.delete(id, (err, deleteRes) =>{
        if(err){ 
            console.log(err);
            //res.end(JSON.stringify({status: 'error', pollId: null}));             
        } else {
            debug.log('deleted doc id: ' + id);
            //on succesfull delete
            votesDb.delete(id);
            //res.end(JSON.stringify({status: 'ok', pollId: id}));
            res.sendStatus(200);            
        }        
    });
    //redirect handled by client in poll-ui.js            
});

module.exports = router;