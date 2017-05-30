const express = require('express');
const router = express.Router();

//handle base route to /polls
router.get('/', (req, res, next) => {
    res.render('mypolls');
});

//handle /polls/:id
router.get('/:id', (req, res, next) => {
    var id = req.params.id;    
    res.render('poll', {name: id});
});


module.exports = router;