const express = require("express");
const router = express.Router();
const passport = require("passport");
const Poll = require("../models/polls");
const User = require("../models/user");
const middleWare = require("../middleware");
const isLoggedIn = middleWare.isLoggedIn;
const checkPollOwnership = middleWare.checkPollOwnership;
//require common messages
const Message = require("../localization")();

//Show Home Page
router.get("/", function(req, res){
    res.render("home");
});

//SHOW REGISTERATION PAGE
router.get("/register", function(req, res){
    res.render("register");
});

//REGISTER NEW USER
router.post("/register", function(req, res){    
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err) {
        console.log(err);  
        req.flash("error", err);        
        res.redirect("/register");
       } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", Message.RegistrationSuccess);   
                res.redirect("/polls");           
            });    
       }       
    });
});

//SHOW LOGIN
router.get("/login", function(req, res){
    res.render("login");
});

//ATTEMPT LOGIN - with local strategy
router.post("/login", passport.authenticate("local", {
    successRedirect: "/polls",
    failureRedirect: "/login",
    failureFlash: true
}), function (req, res){
   //nothing here for now
});

//LOGOUT
router.get("/logout", (req, res) =>{
    req.logout();
    req.flash("success", Message.LogoutSuccess);
    res.redirect("/polls");
});

module.exports = router;