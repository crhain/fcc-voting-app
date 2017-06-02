const express = require('express');
const router = express.Router();
//load route handlers
const polls = require('./polls.js');
const myPolls = require('./my-polls.js');
const newPoll = require('./new-poll.js');

//set up routes
router.use('/polls', polls);
router.use('/mypolls', myPolls);
router.use('/newpoll', newPoll);

//define route for main page
router.get('/', (req, res, next) => {
    let user = global.debug ? {name: "Carl"} : req.user;
    res.render('home', {user: user.name});
});

module.exports = router;

