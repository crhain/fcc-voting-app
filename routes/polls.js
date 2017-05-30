const express = require('express');
const router = express.Router();
const pollIdHandler = require('./polls-id.js');

//handle base route to /polls
router.get('/', (req, res, next) => {
    let user = global.debug ? 'default' : req.user;
    //query database to get listing of all polls
    //call render with array of polls {polls: [{id: _id, name}]}
    //template polls.hbs will set each  item with an id=id and name
    res.render('polls', {user, polls: global.polls});
});

//handle /polls/:id
router.get('/:id', pollIdHandler);


module.exports = router;