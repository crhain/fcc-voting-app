const express           = require('express');
const router            = express.Router();

//handle base route to /polls : retrieves all polls
router.get('/', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;





