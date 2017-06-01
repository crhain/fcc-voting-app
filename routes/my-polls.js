const express = require('express');
const router = express.Router();
const pollIdHandler = require('./polls-id.js');
const db = require('../database.js');

//handle base route to /polls
router.get('/', (req, res, next) => {
    let user = global.debug ? 'default' : req.user;
    res.render('mypolls', {user, mypolls: global.mypolls});
});

//handle /polls/:id
router.get('/:id', pollIdHandler);


module.exports = router;