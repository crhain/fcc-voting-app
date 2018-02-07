const express           = require('express');
const db                = require('../models/database.js');
const router            = express.Router();
const pollIdHandler     = require('./polls-id.js');
const pollsDb           = require('../models/polls.js');

//handle base route to /polls : retrieves all polls
router.get('/', (req, res, next) => {
    let user = global.debug.getUser(); 
    if(user === undefined){
        user = req.user;
    }
    pollsDb.getAll((err, polls)=>{
        if(err){
            console.log(err);
        } else {
            debug.log(polls);
            res.render('poll/polls', {user: user && user.name, polls: polls});
        }
    });    
});

//handle /polls/:id
router.get('/:id', pollIdHandler);

module.exports = router;


//UDPATE POLL ROUTE - VOTE
// --- note: instead of storing user name in voters we should use the userId/also update models/polls to require this as well
router.put("/:id/vote", function (req, res){    
    var optionId = req.body.option;
    var user = req.user;
    //enable or disable multivote for debug
    var query;
    if(true){
        query = {_id: req.params.id};
    } else {
        query = {_id: req.params.id, voters: {$not: {$all: [user._id]}}}; 
    }        
    if(optionId === "new"){
        Poll.findOneAndUpdate(
            query,
            {$addToSet: {pollOptions: {option: req.body.newOption, count: 1}}},
            {new: true},
            function(err, poll){
                if(err){                    
                    debug.log("ERROR VOTING WITH NEW OPTION");
                    debug.log(err); 
                    req.flash("error", Message.Error); 
                    return res.redirect("/polls");
                } else {
                    //nesting second query because you cannot use two $addToSet calls together.  Dumb.
                    Poll.findOneAndUpdate(
                        {_id: req.params.id},
                        {$addToSet:{voters: user._id}, $inc: {votes: 1}},
                        {new: true},
                        function(err, secondPoll){
                            if(err){
                                debug.log("ERROR CHECKING FOR EXISTING VOTE FROM USER");
                                debug.log(err); 
                                req.flash("error", Message.Error); 
                                return res.redirect("/polls");
                            } else {
                                if(secondPoll){
                                    //redirect somehwere (show page)
                                    req.flash("success", Message.VoteSuccess);
                                    return res.redirect("back");
                                } else {
                                    req.flash("error", Message.VoteOnlyOnce);
                                    return res.redirect("/index");     
                                }                                
                            }
                        }
                    );                    
                }
        });
    } else {        
        //enable or disable multivote for debug   
        if(true){
            query = {_id: req.params.id, "pollOptions._id": optionId};
        } else {
            query = {_id: req.params.id, "pollOptions._id": optionId, voters: {$not: {$all: [user._id]}}}; 
        }    
        //record already exists, so update it with new vote and voter
        Poll.findOneAndUpdate(
            query,
            {$inc: { "pollOptions.$.count" : 1 }, $addToSet:{voters: user._id}},
            {new: true},
            function(err, poll){
                if(err){
                    debug.log("ERROR VOTING FOR EXISTING OPTION"); 
                    debug.log(err); 
                    req.flash("error", Message.Error); 
                    return res.redirect("/polls");
                } else {
                    if(poll){
                        //redirect somehwere (show page)
                        req.flash("success", Message.VoteSuccess);
                        return res.redirect("back");
                    } else {
                        req.flash("error", Message.VoteOnlyOnce);
                        return res.redirect("back");     
                    }
                    
                }
        });     
    }
});

//INDEX ROUTE 2 - shows listing of user polls
router.get("/user", isLoggedIn, function(req, res){
    //for now, it does the same thing as first index route
    Poll.find({"author.id": req.user._id}, function(err, polls){
        if(err){
            debug.log("ERROR GETTING USER INDEX ROUTE");
            console.log(err);
            req.flash("error", Message.Error);
            return res.redirect("/polls");
        } else {
            // polls : polls contains poll data
            //         filter: "user" indicates page is showing user polls
            return res.render("polls/index", {polls, filter: "user"})
        }
    });    
});