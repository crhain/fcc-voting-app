const Poll = require("../models/polls");
require('../helpers/debug.js');
// all the middleware goes here
var middlewareObj = {};

//middleware to authenticate user
middlewareObj.isLoggedIn = function(req, res, next){    
    if(debug.canAutolog() || req.isAuthenticated()){
        return next();
    }
    //flash message if authentication fails and then redirect to /login
    req.flash("error", "You need to be logged in to do that.");
    return res.redirect("/login");    
};

middlewareObj.isLoggedOut = function(req, res, next){
    if( !(debug.canAutolog() || req.isAuthenticated()) ){
        return next();
    } 
    debug.log("REDIRECTING FROM isLoggedOut FUNCTION");   
    return res.redirect("/login");    
}

// middleware that checks to see if user logged in and own the poll
// this function has some kind of major bug in it.  It does not work as middleware
middlewareObj.checkPollOwnership = function(req, res, next){
    if(debug.canAutolog() || req.isAuthenticated()){
         Poll.findById(req.params.id, function(err, poll){
            if(err || !poll){                
                debug("CHECKING POLL OWNERSHIP FOR POLL:");
                debug(poll);
                debug.log(err);
                req.flash("error", "Polls not found!");
                return res.redirect("back");
            } else if(poll.author.id.equals(req.user._id)) {
                // || req.user.isAdmin  
                req.poll = poll;
                next();                
            } else {
                debug.log("REDIRECTING TO POLL: " + req.params.id);
                req.flash("error", "You don't have permission to do that!");                
                return res.redirect("/polls/" + req.params.id);
            }
        });         
                   
    } else {
        req.flash("error", "You need to be logged in to do that.");
        return res.redirect("/polls/" + req.params.id);
    }    
};

module.exports = middlewareObj;