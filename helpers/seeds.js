const mongoose = require("mongoose");
const Poll = require("../models/polls");
require("./debug");
// console.log("current user is: " + debug.getUser().username);


function seedDB(){    
    //Clear pollsbase
    Poll.remove({}, function(err){
        if(err){
            console.log("ERROR!");
        } else {
            console.log("removed polls!");            
            var user = debug.getUser();
            var username, userid;
            if(user){
                username = user.username;
                userid = user._id;
            }                        
            var polls = [
                {
                    name: "Mountains",
                    question: "What is the most scenic mountain in the world?",
                    pollOptions: [
                        {option: "Everest"},
                        {option: "K9"},
                        {option: "Denali"},
                        {option: "Mont Blanc"}
                    ],
                    author: {
                        id: user ? userid : mongoose.Types.ObjectId(),
                        name: user ? username : "Mary"
                    }
                },
                {
                    name: "Programming Language",
                    question: "What is your favorite programming language?",
                    pollOptions: [
                        {option: "JavaScript"},
                        {option: "Java"},
                        {option: "Python"},
                        {option: "PHP"}
                    ],
                    author: {
                        id: mongoose.Types.ObjectId(),
                        name: "Carl"
                    }
                }    
            ];            
            //add a few polls
            polls.forEach((seed) =>{
                Poll.create(seed, (err, poll) =>{
                    if(err){
                        console.log("ERROR!");
                    } else {
                        // console.log("added a poll");                        
                    }
                });    
            });
        }   
    });
}

module.exports = seedDB;