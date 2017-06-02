const db = require('./database.js');

exports.create = function(user, pollName, pollOptions, cb){
    let poll = {}; //fill in with data structure and use method to get database id
    
    //call db method to create new record
};

//get
exports.getById = function(id, cb){
    let collection = db.get().collection('polls');
    collection.findOne({_id: id}, (err, poll)=>{
        if(err){
            return cb(err);
        } else {
            return cb(null, poll);
        }
    });
};

//get all polls from database
exports.getAll = function(cb){
    let collection = db.get().collection('polls');
    collection.find().toArray((err, polls)=>{
        if(err){
            return cb(err);
        } else {
            return cb(null, polls);
        }        
    });
};

//get all polls by user
exports.getAllByUser = function(user, cb){
    let collection = db.get().collection('polls');
    collection.find({by: user.name}).toArray((err, myPolls)=>{
        if(err){
            return cb(err);
        } else {
            return cb(null, myPolls);
        }        
    });
}