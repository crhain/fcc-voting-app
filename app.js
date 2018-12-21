//////////////////////////////////////////////////////////////
// IMPORTS                                                  //
//////////////////////////////////////////////////////////////
//load middleware
const express           = require('express');
const mongoose          = require('mongoose');
const path              = require('path');
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');
const methodOverride    = require('method-override');
const flash             = require('connect-flash');
//load authentication modules
const session           = require('express-session');
const passport          = require('passport');
const LocalStrategy     = require("passport-local");
const TwitterStrategy   = require('passport-twitter').Strategy;
//create express app
const app               = express();
//configure basic flags
const PORT              = process.env.PORT || 8080;
const IP                = process.env.IP;
const ARGUMENTS         = process.argv.slice(2);
const seedDB            = require("./helpers/seeds"); //seed the database
//require models
const User              = require("./models/user");
// requiring routes
const pollRoutes        = require("./routes/polls");
const indexRoutes       = require("./routes/index");

//config variables for twitter login
const keys              = require("./config/keys");

const twitterCallbackURL = "https://crh-voting-app.herokuapp.com/login/twitter/return";

// The following callback is for testing on localhost - use instead of the one above
// const twitterCallbackURL = "http://localhost:" + PORT + "/login/twitter/return";

//setup debug stuff
require('./helpers/debug.js');
if(ARGUMENTS[0] === "debug"){
    debug.on(true);
    debug.multivote(false);
    debug.autolog(false);
    debug.localDb(false);
}
//////////////////////////////////////////////////////////////
// ESTABLISH DB CONNECTION                                  //
//////////////////////////////////////////////////////////////
const databaseURL = keys.DATABASE; //process.env.DATABASE;
mongoose.connect(databaseURL);

//////////////////////////////////////////////////////////////
// SETUP VIEW ENGINE  & STATIC FOLDER                       //
//////////////////////////////////////////////////////////////
app.use(express.static(__dirname + "/public"));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

//////////////////////////////////////////////////////////////
// CONFIGURE MIDDLEWARE                                     //
//////////////////////////////////////////////////////////////
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride("_method"));
app.use(flash());

//////////////////////////////////////////////////////////////
// SEED DATABASE - FOR TESTING ONLY!!!                      //
//////////////////////////////////////////////////////////////
// seedDB();

//////////////////////////////////////////////////////////////
// PASSPORT CONFIGURATION                                   //
//////////////////////////////////////////////////////////////
app.use(require("express-session")({
    secret: "You have an opinion or what?",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.use(new TwitterStrategy({
    consumerKey: keys.TWITTER_CLIENT_ID,
    consumerSecret: keys.TWITTER_CLIENT_SECRET,
    callbackURL: twitterCallbackURL
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({twitter_id: profile.id}, function(err, user) {
      if(user) {
        done(null, user);
      } else {
        var user = new User();
        user.provider = "twitter";
        user.twitter_id = profile.id;
        user.fullname = profile.displayName;
        user.username = profile.displayName;
        user.image = profile._json.profile_image_url;
        user.save(function(err) {
          if(err) { throw err; }
          done(null, user);
        });
      }
    })
  }
));


// function(token, tokenSecret, profile, cb) {
//     User.findOrCreate({ twitterId: profile.id }, function (err, user) {
//       if(err){
//           debug.log("ERROR: COULD NOT CREATE NEW USER ACCOUNT USING TWITTER");
//           res.redirect("/login");
//       } else {
//           return cb(null, user);
//       }      
//     });
//   })


passport.serializeUser(function(user, done) {
    done(null, user._id);
});
  
passport.deserializeUser(function(userId, done) {
    User.findOne({_id: userId}, function (err, user) {
        done(err, user);
    });
});

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//////////////////////////////////////////////////////////////
//CUSTOM MIDDLE WARE - SETS SOME DEFAULTS                   //
//////////////////////////////////////////////////////////////
app.use(function(req, res, next){
    //set currentUser to either logged in user or debug user
    if(debug.canAutolog()){
        res.locals.currentUser = req.user || debug.getUser();
    } else {
        res.locals.currentUser = req.user;
    }    
    //set status codes for connect flash
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    //local default for tabbed login/registeration menu
    // register = false    :    show login tab (default)
    // register = true     :    show registration tab (set in /register route)
    res.locals.register = false;
    next();
});

//////////////////////////////////////////////////////////////
//SETUP ROUTES                                              //
//////////////////////////////////////////////////////////////
app.use("/", indexRoutes);
app.use("/polls", pollRoutes);

//DEFAULT ROUTE - PAGE NOT FOUND
app.use("*", (req, res)=>{
    if(req.accepts('html')){
        // note: add custom 404 page here
        // res.end('404: Page Not Found');
        return res.render("404");
    }
    if(req.accepts('json')){
        return res.end(JSON.stringify({error: 'not found'}));
    }
    // default to plain-text. send()
    return res.type('txt').send('Not found');
});

//////////////////////////////////////////////////////////////
//START SERVER                                              //
//////////////////////////////////////////////////////////////
app.listen(PORT, ()=>{
    console.log("Server running on: " + IP + ":" + PORT);
});