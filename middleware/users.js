const mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");
const passportTwitter = require("passport-twitter");

var UserSchema = new mongoose.Schema({
    id: Number,
    username: String,
    password: String,
    photo: String,
    email: String,
    created_on: Date,
    provider: String,
    last_login: Date,
    login_count: Date
});
//plugin passport into mongoose UserSchema.
// UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(passportLocalMongoose);

//export User model
module.exports = mongoose.model("User", UserSchema);