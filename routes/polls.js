const express = require('express');
const router = express.Router();

//handle base route to /polls
router.get('/', (req, res, next) => {
    let user = global.debug ? 'default' : req.user;
    res.render('polls', {user});
});

//handle /polls/:id
router.get('/:id', (req, res, next) => {
    let user = global.debug ? 'default' : req.user;
    var id = req.params.id;    
    res.render('poll', {user, name: id});
});


module.exports = router;