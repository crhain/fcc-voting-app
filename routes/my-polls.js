const express = require('express');
const router = express.Router();
const pollIdHandler = require('./polls-id.js');
const db = require('../models/database.js');
const pollsDb = require('../models/polls.js');

//handle base route to /polls
router.get('/', (req, res, next) => {
    let user = global.debug ? {name: "Carl"} : req.user;
    pollsDb.getAllByUser(user, (err, myPolls) =>{
        if(err){
            console.log(err);
        } else {
            res.render('mypolls', {user: user.name, myPolls});    
        }
        
    });

});

//handle /polls/:id
router.get('/:id', pollIdHandler);


module.exports = router;