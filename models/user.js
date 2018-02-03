var mongoose                       = require("mongoose");
var passportLocalMongoose          = require("passport-local-mongoose");
const Message                      = require("../localization")();

var UserSchema = new mongoose.Schema({
    username: String,    
    created: {type: Date, default: Date.now },
    last: {type: Date, default: Date.now},
    name: String,
    emails: [String],
    picture: String,
   
});

//plugin passport into mongoose UserSchema.
UserSchema.plugin(passportLocalMongoose, {
    limitAttempts: true,
    maxAttempts: 3,
    passwordValidator: validatePassword
});

//PASSWORD VALIDATION FUNCTION
// note: returning anyting other than null or undefined causes validation to fail;
// can pass simple text string with error message.
function validatePassword(password, cb){    
    //check to see if password was entered    
    if(password){
        if(password.length < 5){
            return cb(Message.PasswordTooShort);
        } else if(password.length > 20){
            return cb(Message.PasswordTooLong);
        } else {
            //success!
            return cb(null);
        }        
    } 
    //no password 
    return cb(Message.NoPassword);    
}

//initialize user model
module.exports = mongoose.model("User", UserSchema);