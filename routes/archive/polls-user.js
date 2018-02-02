const express               = require('express');
const router                = express.Router();
const ensureAuthenticated   = require('../helpers/authenticate.js');
const pollIdHandler         = require('./polls-id.js');
const db                    = require('../models/database.js');
const pollsDb               = require('../models/polls.js');

//handle base route to /polls
router.get('/', ensureAuthenticated, (req, res, next) => {
    let user = global.debug.getUser(); 
    if(user === undefined){
        user = req.user;
    }
    if(user){
        
        pollsDb.getAllByUser(user, (err, myPolls) =>{
            if(err){
                console.log(err);
            } else {
                res.render('poll/mypolls', {user: user && user.name, myPolls});    
            }
            
        });
    } else {
        debug.log('Cannot get polls for non-existant user!');
    }
    

});

//handle /polls/user/:id
router.get('/:id', pollIdHandler);


module.exports = router;