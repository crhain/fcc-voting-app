var mongoose                       = require("mongoose");
var passportLocalMongoose          = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,    
    created: {type: Date, default: Date.now },
    logged: {type: Date, default: Date.now },
    name: String,
    emails: [String],
    picture: String,
   
});

//plugin passport into mongoose UserSchema.
UserSchema.plugin(passportLocalMongoose);

//initialize user model
module.exports = mongoose.model("User", UserSchema);