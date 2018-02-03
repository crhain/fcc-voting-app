//load middleware
const express           = require('express');
const mongoose          = require('mongoose');
const path              = require('path');
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');
const methodOverride    = require('method-override');
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

//setup debug stuff
require('./helpers/debug.js');
if(ARGUMENTS[0] === "debug"){
    debug.on(true);
    debug.multivote(false);
    debug.autolog(false);
    debug.localDb(false);
}

//connect to database
const databaseURL = process.env.DATABASE;
mongoose.connect(databaseURL);

//global.debug.setUser({name: 'Bob'});
//set public directory
app.use(express.static(__dirname + "/public"));
//set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

//set up app to use middleware
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride("_method"));

seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "You have an opinion or what?",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//add currentUser local to all routes
app.use(function(req, res, next){
    if(debug.canAutolog()){
        res.locals.currentUser = req.user || debug.getUser();
    } else {
        res.locals.currentUser = req.user;
    }    
    // res.locals.error = req.flash("error");
    // res.locals.success = req.flash("success");
    next();
});

//////////////////////////////////////////////////////////////
//SETUP ROUTES                                              //
//////////////////////////////////////////////////////////////
// app.use(require('./routes/index.js'));

app.use("/", indexRoutes);
app.use("/polls", pollRoutes);


//default route if not found
// app.use((req, res)=>{
//     res.status(404);
//     if(req.accepts('html')){
//         res.end('404: Page Not Found');
//     }
//     if(req.accepts('json')){
//         res.end(JSON.stringify({error: 'not found'}));
//     }
//     // default to plain-text. send()
//     res.type('txt').send('Not found');
// });

//start server
app.listen(PORT, ()=>{
    console.log("Server running on: " + IP + ":" + PORT);
});


