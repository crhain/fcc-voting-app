var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: String,    
    created: {type: Date, default: Date.now },
    logged: {type: Date, default: Date.now },
    emails: [String],
    picture: String,
   
});

//initialize user model
module.exports = mongoose.model("User", pollSchema);