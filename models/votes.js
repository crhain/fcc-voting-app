const ObjectID = require('mongodb').ObjectID;
const db = require('./database.js');

exports.create = function(pollId, cb){
    collection = db.get().collection('votes');
    
    
    collection.insertOne({"pollId": ObjectID(pollId).toString() , "voters": []}, (err, result)=>{
        if(err){
            return cb(err);
        } else {
            return cb(null, result);
        }
    });
}

exports.delete = function(pollId, cb){
    let collection = db.get().collection('votes');
    collection.remove({pollId: pollId}, {w:1}, (err, deleteRes)=>{
        if(err){
            //return cb(err);
        } else {
            //return cb(null, deleteRes);
        }
    });
}

exports.findVoter = function(pollId, voter, cb){
    let collection = db.get().collection('votes');

    collection.findOne({pollId: pollId, voters: voter}, (err, vote)=>{
        if(err){
            return cb(err);
        } else {
            return cb(null, vote);
        }
    });
}

exports.addVote = function(pollId, voter, cb){
    let collection = db.get().collection('votes');
    //insert vote into collection
    //Note: if using a $ function in update, you must use other $ functions as bellow
    // not {pollId: pollId, $addToSet: {voters: voter}}
    collection.updateOne(
        {pollId: pollId},
        {   $set: {pollId: pollId},
            $addToSet: {voters: voter} 
        },
        {upsert: true},
        (err, result) => {
            if(err){
                console.log(err);
            } else {
                console.log('updated votes record');
            }
        }
    );
}

//pollId: pollId,