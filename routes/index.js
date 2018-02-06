const express = require("express");
const router = express.Router();
const passport = require("passport");
const Poll = require("../models/polls");
const User = require("../models/user");
const middleWare = require("../middleware");
const isLoggedIn = middleWare.isLoggedIn;
const isLoggedOut = middleWare.isLoggedOut;
const checkPollOwnership = middleWare.checkPollOwnership;
//require common messages
const Message = require("../localization")();
require('../helpers/debug.js');

//Show Home Page
router.get("/", function(req, res){
    return res.render("home");
});

//SHOW REGISTERATION PAGE
router.get("/register", isLoggedOut, function(req, res){
    return res.render("login", {register: true}); //pass this variable to tell it to show registration tab
});

//REGISTER NEW USER
router.post("/register", isLoggedOut, function(req, res){    
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err) {
        console.log(err);  
        req.flash("error", err);        
        return res.redirect("/register");
       } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", Message.RegistrationSuccess);   
                return res.redirect("/polls");           
            });    
       }       
    });
});

//SHOW LOGIN
router.get("/login", isLoggedOut, function(req, res){
    return res.render("login");
});

//ATTEMPT LOGIN - with local strategy
router.post("/login", isLoggedOut, passport.authenticate("local", {
    successRedirect: "/polls",
    failureRedirect: "/login",
    failureFlash: true    
}), function (req, res){
   //nothing here for now
   //add into authenticate as option
//    failureFlash: true
});

//LOGOUT
router.get("/logout", isLoggedIn, (req, res) =>{
    req.flash("success", Message.LogoutSuccess);
    req.logout();    
    return res.redirect("/polls");
});

module.exports = router;