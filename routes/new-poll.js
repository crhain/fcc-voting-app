const express = require('express');
const router = express.Router();
const db = require('../helpers/database.js');

//handle base route to /polls
router.get('/', (req, res, next) => {
    let user = global.debug ? {name: "Carl"} : req.user;
    res.render('newpoll', {user: user.name});
});



module.exports = router;