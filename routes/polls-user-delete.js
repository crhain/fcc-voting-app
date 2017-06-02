const express = require('express');
const db = require('../models/database.js');
const router = express.Router();
const pollsDb = require('../models/polls.js');

//handle base route to /polls/user/delete/:id : deletes poll id
router.post('/:id', (req, res, next) => {
    let user = global.debug ? {name: "Carl"} : req.user;
    let id = req.params.id;
    console.log('deleting ' + id);
});

module.exports = router;