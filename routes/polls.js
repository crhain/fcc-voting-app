const express = require("express");
const router = express.Router();
const Poll = require("../models/polls");
const middleWare = require("../middleware");
const isLoggedIn = middleWare.isLoggedIn;
const checkPollOwnership = middleWare.checkPollOwnership;
//require common messages
const Message = require("../localization")();

//require debug module
require("../helpers/debug");

//INDEX ROUTE - shows listing of all polls
router.get("/", function(req, res){
    // res.send("showing polls");
    Poll.find({}, function(err, polls){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            // polls : polls contains poll data
            //         filter: "non" indicates page is showing all polls
            res.render("polls/index", {polls, filter: "none", sort:{key: "", order: ""}});
        }
    });    
});

//INDEX ROUTE 2 - shows listing of user polls
router.get("/user", isLoggedIn, function(req, res){
    //for now, it does the same thing as first index route
    Poll.find({"author.id": req.user._id}, function(err, polls){
        if(err){
            console.log(err);
            req.flash("error", Message.Error);
            res.redirect("/polls");
        } else {
            // polls : polls contains poll data
            //         filter: "user" indicates page is showing user polls
            res.render("polls/index", {polls, filter: "user"})
        }
    });    
});

//NEW ROUTE
router.get("/new", isLoggedIn, function(req, res){
    res.render("polls/new");
});

//CREATE ROUTE
router.post("/", isLoggedIn, function(req, res){
    debug.log("Creating new poll:");
    debug.log(req.body.poll);
    let poll = req.body.poll;
    let debugUser = debug.getUser();
    poll.author = {};
    poll.author.id = debugUser ? debug.getUser()._id : undefined || req.user._id;
    poll.author.name = debugUser ? debug.getUser().username : undefined || req.user.username;
    //get poll.optionsRaw and reformat is as [{option: option}]    
    poll.pollOptions = poll.optionsRaw.split("|").slice(1).map((option) =>{
        return {option, voters:[]};
    });
    poll.optionsRaw = "";
    debug.log("My poll: ");
    debug.log(poll);
    // res.send("created poll!");
    Poll.create(poll, function(err, poll){
        if(err){            
            console.log(err);
            req.flash("error", Message.DidNotCreatePoll);
            res.redirect("/polls");
        } else {
            req.flash("success", Message.CreatedPoll);
            res.redirect("/polls");
        }
    });    
});


//SHOW ROUTE - shows more info about poll
router.get("/:id", function(req, res){
    Poll.findById(req.params.id, function(err, poll){
        if(err || !poll){
            debug.log(err);
            req.flash("error", Message.PollDoesNotExist);
            return res.redirect("/polls");
        } else {
            res.render("polls/show", {poll});
        }
    });
});

//UDPATE POLL ROUTE - VOTE
// --- note: instead of storing user name in voters we should use the userId/also update models/polls to require this as well
router.put("/:id/vote", isLoggedIn, function (req, res){    
    var optionId = req.body.option;
    var user = req.user;
    //enable or disable multivote for debug
    var query;
    if(debug.canMultivote()){
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
                    debug.log(err); 
                    req.flash("error", Message.Error); 
                    res.redirect("/polls");
                } else {
                    //nesting second query because you cannot use two $addToSet calls together.  Dumb.
                    Poll.findOneAndUpdate(
                        {_id: req.params.id},
                        {$addToSet:{voters: user._id}},
                        {new: true},
                        function(err, secondPoll){
                            if(err){
                                debug.log(err); 
                                req.flash("error", Message.Error); 
                                res.redirect("/polls");
                            } else {
                                if(poll){
                                    //redirect somehwere (show page)
                                    req.flash("success", Message.VoteSuccess);
                                    res.redirect("back");
                                } else {
                                    req.flash("error", Message.VoteOnlyOnce);
                                    res.redirect("back");     
                                }                                
                            }
                        }
                    );                    
                }
        });
    } else {        
        //enable or disable multivote for debug   
        if(debug.canMultivote()){
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
                    debug.log(err); 
                    req.flash("error", Message.Error); 
                    res.redirect("/polls");
                } else {
                    if(poll){
                        //redirect somehwere (show page)
                        req.flash("success", Message.VoteSuccess);
                        res.redirect("back");
                    } else {
                        req.flash("error", Message.VoteOnlyOnce);
                        res.redirect("back");     
                    }
                    
                }
        });     
    }
});


//DESTROY POLL ROUTE
// note: add in middleware to check if user is logged in and has voted already
// checkPollOwnership is broken so hard!
router.delete("/:id", checkPollOwnership, function (req, res){
    //find and update the correct campground
    Poll.findByIdAndRemove(req.params.id, function(err){
      if(err){
        debug.log(err); 
        req.flash("error", Message.Error); 
        res.redirect("/polls");
      } else {
        //redirect somehwere (show page)
        req.flash("success", Message.DeleteSuccess);
        res.redirect("/polls");
      }
    });
});

module.exports = router;