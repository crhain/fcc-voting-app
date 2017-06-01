const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    let user = global.debug ? {name: "Carl"} : req.user;
    res.render('home', {user: user.name});
});

module.exports = router;

