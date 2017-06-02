const express = require('express');
const router = express.Router();
const pollIdHandler = require('./polls-id.js');
const db = require('../helpers/database.js');

//handle base route to /polls
router.get('/', (req, res, next) => {
    let user = global.debug ? {name: "Carl"} : req.user;
    //query database to get listing of all polls
    let collection = db.get().collection('polls');
    collection.find({by: user.name}).toArray((err, myPolls)=>{
        if(err){
            res.render('mypolls', {user: user.name, myPolls: ["ERROR"]});
        } else {
            res.render('mypolls', {user: user.name, myPolls});    
        }        
    });

});

//handle /polls/:id
router.get('/:id', pollIdHandler);


module.exports = router;