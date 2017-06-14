console.log('debugging module loaded');
var user = {id: '1', name: 'Default', emails: [{value: 'default@somewhere.com'}]};
var autolog = false;
var multivote = false;
var localDb = false;
var db = 'mongodb://localhost:27017/voteing-app';

global.debug = {
    on: false,        
};

global.debug.log = function (...args) {
    if(this.on){
        console.log(...args);
    }
    
}

global.debug.setUser = function(newUser){
     user = newUser;
}

global.debug.getUser = function(){
    if(this.on && autolog){        
        return user;
    } else {
        return undefined;
    }    
}

global.debug.autolog = function(status){
    autolog = status;
}

global.debug.canAutolog = function(){
    if(this.on){
        return autolog;
    } 

    return false;
}

global.debug.multivote = function(status){
    multivote = status;
}

global.debug.canMultivote = function(){
    if(this.on){
        return multivote;
    }

    return false;
}

global.debug.localDb = function(status){
    localDb = status;
}

global.debug.getDbPath = function(){
    if(this.on && localDb){
        return db;
    } 

    return undefined;
}

//This is is just for testing before we get database in place
global.polls = [
    {
        _id: '1', 
        name: 'presidents', 
        by: 'Anne Nomous',
        pollOptions: [
            {id: 0, option: 'George Washington', count: 0},
            {id: 1, option: "Lincoln", count: 0}
        ]
    }, 
    {
        _id: '3', 
        name: 'programming languages', 
        by: "Carl",
        pollOptions: [
            {id: 0, option: 'JavaScript', count: 5},
            {id: 1, option: 'C++', count: 2},
            {id: 2, option: 'PHP', count: 1},
            {id: 3, option: 'Java', count: 2},
            {id: 4, option: 'C#', count: 3},
            {id: 5, option: 'Ruby', count: 1},
            {id: 6, option: 'Python', count: 4}
            
        ]
    },
    {
        _id: '4', 
        name: 'food', 
        by: "Carl",
        pollOptions:[
            {id: 0, option: 'Pasta', count: 0},
            {id: 1, option: 'Ceral', count: 0}
        ]
    }
];
