const express = require("express");
const router = express.Router();
const Poll = require("../models/polls");
const middleWare = require("../middleware");
const isLoggedIn = middleWare.isLoggedIn;
const checkPollOwnership = middleWare.checkPollOwnership;

router.get("/", function(req, res){
    res.render("home");
});

router.get("/login", function(req, res){
    res.render("login");
});

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    res.send("You are now logged in! Not really...");
    // var newUser = new User({username: req.body.username});
    // User.register(newUser, req.body.password, function(err, user){
    //    if(err) {
    //     console.log(err);  
    //     req.flash("error", err.message);
    //     //res.render("register");  
    //     res.redirect("/register");
    //    } else {
    //         passport.authenticate("local")(req, res, function(){
    //             req.flash("success", "Welcome to YelpCamp " + user.username);   
    //             res.redirect("/campgrounds");           
    //         });    
    //    }
       
    // });
});

module.exports = router;