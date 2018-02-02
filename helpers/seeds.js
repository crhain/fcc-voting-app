const mongoose = require("mongoose");
const Poll = require("../models/polls");


var data = [
    {
        name: "Mountains",
        question: "What is the most scenic mountain in the world?",
        pollOptions: [
            {option: "Everest"},
            {option: "K9"},
            {option: "Denali"},
            {option: "Mont Blanc"}
        ],
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
    }    
    ];

function seedDB(){
    //Clear database
    Poll.remove({}, function(err){
        if(err){
            console.log("ERROR!");
        } else {
            console.log("removed polls!");
            //add a few polls
            data.forEach((seed) =>{
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