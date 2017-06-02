const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const pollsDb = require('../models/polls.js');

//handle base route to /polls
router.get('/', (req, res, next) => {
    let user = global.debug ? {name: "Carl"} : req.user;
    res.render('newpoll', {user: user.name});
});



module.exports = router;