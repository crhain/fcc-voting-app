const express = require('express');
const db = require('../models/database.js');
const router = express.Router();
const pollsDb = require('../models/polls.js');

//handle /polls/vote/:id : votes for poll option
router.post('/:id', (req, res, next) => {
    let user = global.debug ? {name: "Carl"} : req.user;
    let id = req.params.id;
    console.log('voted for ' + id);

    
});

module.exports = router;