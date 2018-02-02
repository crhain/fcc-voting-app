const express = require("express");
const router = express.Router();
const Poll = require("../models/polls");
const middleWare = require("../middleware");
const isLoggedIn = middleWare.isLoggedIn;
const checkPollOwnership = middleWare.checkPollOwnership;
require("../helpers/debug");
//INDEX ROUTE - shows listing of all polls
router.get("/", function(req, res){
    // res.send("showing polls");
    Poll.find({}, function(err, polls){
        if(err){
            console.log("ERROR");
            res.send(err);
        } else {
            res.render("polls/index", {polls})
        }
    });    
});


//INDEX ROUTE 2 - shows listing of user polls
router.get("/user", isLoggedIn, function(req, res){
    //for now, it does the same thing as first index route
    Poll.find({}, function(err, polls){
        if(err){
            debug.log("ERROR");
            res.send(err);
        } else {
            res.render("polls/index", {polls})
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
    // poll.author = {};
    // poll.author.id = req.user._id;
    // poll.author.name = req.user.name;
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
            debug.log("Could not create!");
            debug.log(err);
            res.send(err); //add proper error handling
        } else {

            res.redirect("/polls");
            // res.sendStatus(200); 
        }
    });    
});


//SHOW ROUTE - shows more info about poll
router.get("/:id", function(req, res){
    Poll.findById(req.params.id, function(err, poll){
        if(err || !poll){
            debug.log(err);
            return res.redirect("/polls");
        } else {
            res.render("polls/show", {poll});
        }
    });
});

//UDPATE POLL ROUTE - VOTE
// router.put("/:id", function(req, res){
//     // var option = req.body.option;    
//     // debug.log("voted for option id: ");
//     // debug.log(option);
//     debug.log("recieved post request");
//     res.send("voted!");

//     // res.send("Voted!");
//     //find and update the correct poll with new count
//     // Poll.findByIdAndUpdate(req.params.id, poll, function(err, poll){
//     //    if(err){
//     //        debug.log(err);
//     //        res.redirect("/polls");
//     //    } else {
//     //         //redirect somehwere (show page)
//     //         res.redirect("/polls/" + req.params.id);
//     //    }
//     // });
// });

router.put("/:id/vote", function (req, res){    
    var optionId = req.body.option;
    debug.log(optionId);
    // findByIdAndUpdate
    Poll.findOneAndUpdate(
        {_id: req.params.id, "pollOptions._id": optionId},
        {$inc: { "pollOptions.$.count" : 1 } },
        {new: true},
        function(err, poll){
            if(err){
                debug.log(err);  
                res.redirect("/polls");
            } else {
                //redirect somehwere (show page)
                res.redirect("back");
            }
    });
});


//DESTROY POLL ROUTE
// note: add in middleware to check if user is logged in and has voted already
router.delete("/:id", function (req, res){
    //find and update the correct campground
    Poll.findByIdAndRemove(req.params.id, function(err){
      if(err){
        debug.log(err);  
        res.redirect("/polls");
      } else {
        //redirect somehwere (show page)
        res.redirect("/polls");
      }
    });
});

module.exports = router;