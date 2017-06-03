const express = require('express');
const db = require('../models/database.js');
const router = express.Router();
const pollsDb = require('../models/polls.js');

//handle /polls/vote/:id : votes for poll option
router.post('/:id', (req, res, next) => {
    let user = global.debug ? {name: "Carl"} : req.user;
    let id = req.params.id;
    let optionId = req.body.id;
    let option = req.body.option;
    console.log('voted for poll id: ' + id);
    console.log('with item: ' + optionId + ' : ' + option);
    //need to check to see if vote item in current record
    //if not we need to update the record
    //send on succesful vote
    res.sendStatus(200);    
});

module.exports = router;