const Poll = require("../models/polls");
require('../helpers/debug.js');
// all the middleware goes here
var middlewareObj = {};

//middleware to authenticate user
middlewareObj.isLoggedIn = function(req, res, next){
    console.log("I can autolog?");
    console.log(debug.canAutolog);
    if(debug.canAutolog() || req.isAuthenticated()){
        return next();
    }
    //flash message if authentication fails and then redirect to /login
    // req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");    
};

//middleware that checks to see if user logged in and own the campground
middlewareObj.checkPollOwnership = function(req, res, next){
    if(debug.canAutolog() || req.isAuthenticated()){
         Poll.findById(req.params.id, function(err, poll){
            if(err || !poll){
                // req.flash("error", "Campgrounds not found!");
                // res.redirect("back");
                console.log(err);
            } else if(poll.author.id.equals(req.user._id) || req.user.isAdmin) {
                req.poll = poll;
                next();                
            } else {
                // req.flash("error", "You don't have permission to do that!");
                res.redirect("/polls/" + req.params.id);
            }
        }); 
        next();           
    } else {
        // req.flash("error", "You need to be logged in to do that.");
        res.redirect("/polls/" + req.params.id);
    }    
};

module.exports = middlewareObj;