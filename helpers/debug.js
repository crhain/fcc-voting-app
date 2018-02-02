var mongoose = require("mongoose");

console.log('debugging module loaded');
var user = {_id: mongoose.Types.ObjectId(), username: 'Default Guy', emails: [{value: 'default@somewhere.com'}]};
var autolog = false;
var multivote = false;
var localDb = false;
var on = false;
var db = 'mongodb://localhost:27017/voteing-app';

global.debug = {           
};

global.debug.log = function (...args) {
    if(on){
        console.log(...args);
    }
    
}

global.debug.setUser = function(newUser){
     user = newUser;
}

global.debug.getUser = function(){
    if(debug.on() && autolog){        
        return user;
    } else {
        
        return undefined;
    }    
}

global.debug.autolog = function(status){
    autolog = status;
}

global.debug.canAutolog = function(){
    if(debug.on()){
        return autolog;
    } 

    return false;
}

global.debug.multivote = function(status){
    multivote = status;
}

global.debug.canMultivote = function(){
    if(debug.on()){
        return multivote;
    }

    return false;
}

global.debug.localDb = function(status){
    localDb = status;
}

global.debug.getDbPath = function(){
    if(debug.on() && localDb){
        return db;
    } 

    return undefined;
}

global.debug.on = function(state){
    if(state !== undefined){
        return on = state;
    } else {
        return on;
    }
}

