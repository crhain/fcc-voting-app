const express           = require('express');
const passport          = require('passport');
const db                = require('../models/database.js');
const router            = express.Router();
const usersDb           = require('../models/users.js');

//handle base route to /polls : retrieves all polls
router.get('/', (req, res, next) => {
    let user = global.debug.getUser(); 
    if(user === undefined){
        user = req.user;
    }        
    res.render('login', {user: user && user.name});    
});

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/return', 
            passport.authenticate('twitter', { failureRedirect: '/login' }),
            (req, res, next) => {
                res.redirect('/');
});

module.exports = router;