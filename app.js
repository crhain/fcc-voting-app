//load middleware
const express           = require('express');
const mongoose          = require('mongoose');
const path              = require('path');
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');
const methodOverride    = require('method-override');
//load authentifiation modules
const session           = require('express-session');
const passport          = require('passport');
const TwitterStrategy    = require('passport-twitter').Strategy;
//load db handler
// const db                = require('./models/database.js');
// const usersDb           = require('./models/users.js');
// const index             = require('./routes/index.js');
//create express app
const app               = express();
//get port
const PORT              = process.env.PORT || 8080;
const IP                = process.env.IP;
const ARGUMENTS         = process.argv.slice(2);
const seedDB            = require("./helpers/seeds"); //seed the database
// requiring routes
const pollRoutes        = require("./routes/polls");
const indexRoutes       = require("./routes/index");

require('./helpers/debug.js');
if(ARGUMENTS[0] === "debug"){
    debug.on(true);
    debug.multivote(false);
    debug.autolog(true);
    debug.localDb(false);
}

console.log("user is called " + debug.getUser().username);

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

//SET UP STUFF FOR AUTHENTIFICATION
app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    }));
app.use(passport.initialize());
app.use(passport.session());    

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

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


//establish connection to database
// db.connect( process.env.DATABASE, (err, db) =>{
//     if(err){
//         console.log('Database error: ' + err);
//     } else {
//         console.log('Successful database connection');
//         //setup passport strategy for authentification
//         passport.serializeUser((user, done) => {
//           done(null, user.id);
//         });

//         passport.deserializeUser((id, done) => {
//            usersDb.getUser(id, done);
//         });
        
//         passport.use(new TwitterStrategy({
//             consumerKey: process.env.TWITTER_CLIENT_ID,  
//             consumerSecret: process.env.TWITTER_CLIENT_SECRET, 
//             callbackURL: 'https://crh-voteing-app.herokuapp.com/auth/twitter/return' //need to set up path for auth/twitter
//           },
//           function(token, tokenSecret, profile, cb) {
//               debug.log(profile);
//               //Database logic here with callback containing our user object              
//               usersDb.update(profile, cb);
//           }
//         ));

            

//     }
// });



