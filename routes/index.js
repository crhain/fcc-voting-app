const express = require('express');
const router = express.Router();
//load route handlers
const polls = require('./polls.js');
const pollsUser = require('./polls-user.js');
const pollsNew = require('./polls-new.js');
const pollsVote = require('./polls-user-vote.js');
const pollsDelete = require('./polls-user-delete.js');

//set up routes
/*/ (get)
/polls (get)
/polls/user (get)
/polls/user/:id
/polls/:id (get)
/polls/vote/:id (post)
/polls/new (get)
/polls/new  (post)
/polls/delete/:id (post)
/polls/twitter/:id (post)
*/

router.use('/polls/user/vote', pollsVote);
router.use('/polls/user/new', pollsNew);
router.use('/polls/user/delete', pollsDelete);
router.use('/polls/user', pollsUser);
router.use('/polls', polls);


//define route for main page
router.get('/', (req, res, next) => {
    let user = global.debug ? {name: "Carl"} : req.user;
    res.render('home', {user: user && user.name});
});

module.exports = router;

