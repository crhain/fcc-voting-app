const express = require('express');
const router = express.Router();

//handle base route to /polls
router.get('/', (req, res, next) => {
    let user = global.debug ? 'default' : req.user;
    res.render('newpoll', {user});
});



module.exports = router;