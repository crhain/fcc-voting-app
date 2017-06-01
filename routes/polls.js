const express = require('express');
const db = require('../database.js');
const router = express.Router();
const pollIdHandler = require('./polls-id.js');

//handle base route to /polls
router.get('/', (req, res, next) => {
    let user = global.debug ? {name: "Carl"} : req.user;
    //query database to get listing of all polls
    let collection = db.get().collection('polls');
    collection.find().toArray((err, polls)=>{
        if(err){
            res.render('polls', {user: user.name, polls: []});
        } else {
            res.render('polls', {user: user.name, polls: polls});    
        }        
    });
    //call render with array of polls {polls: [{id: _id, name}]}
    //template polls.hbs will set each  item with an id=id and name    
});

//handle /polls/:id
router.get('/:id', pollIdHandler);


module.exports = router;