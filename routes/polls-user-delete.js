const express = require('express');
const db = require('../models/database.js');
const router = express.Router();
const pollsDb = require('../models/polls.js');

//handle base route to /polls/user/delete/:id : deletes poll id
router.delete('/:id', (req, res, next) => {
    let user = global.debug ? {name: "Carl"} : req.user;
    let id = req.params.id;
    pollsDb.delete(id, (err, deleteRes) =>{
        if(err){ 
            console.log(err);             
        } else {
            console.log('deleted doc id: ' + id);
            //on succesfull delete
            res.redirect('/polls/user'); 
        }
        
    });

    //redirect back to /polls/user
            
});

module.exports = router;