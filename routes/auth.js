const express               = require('express');
const passport              = require('passport');
const db                    = require('../models/database.js');
const router                = express.Router();
const usersDb               = require('../models/users.js');
const ensureAuthenticated   = require('../helpers/authenticate.js');

//handle base route to /polls : retrieves all polls
/*router.get('/', ensureAuthenticated, (req, res, next) => {
    let user = global.debug.getUser(); 
    if(user === undefined){
        user = req.user;
    }
    res.render('profile', {user: user});    
});*/

router.get('/', passport.authenticate('twitter', { failureRedirect: '/login' }),
            (req, res, next) => {
                res.redirect('/');
});



module.exports = router;