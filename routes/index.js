const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    let user = global.debug ? 'default' : req.user;
    res.render('home', {user});
});

module.exports = router;

