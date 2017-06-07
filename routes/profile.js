const express           = require('express');
const db                = require('../models/database.js');
const router            = express.Router();
const usersDb           = require('../models/users.js');

//handle base route to /polls : retrieves all polls
router.get('/', (req, res, next) => {
    let user = global.debug.on ? global.debug.getUser() : req.user;
    res.render('profile', {user: user});    
});


module.exports = router;