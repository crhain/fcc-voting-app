const express = require('express');
const router = express.Router();

//handle base route to /polls
router.get('/', (req, res, next) => {
    res.render('newpoll');
});



module.exports = router;