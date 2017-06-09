//load middleware
const express           = require('express');
const path              = require('path');
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');
//load authentifiation modules
const session           = require('express-session');
const passport          = require('passport');
const TwitterStrategy    = require('passport-twitter').Strategy;
//load db handler
const db                = require('./models/database.js');
const usersDb           = require('./models/users.js');
const index             = require('./routes/index.js');
//create express app
const app               = express();
//get port
const PORT              = process.env.PORT || 3000;
require('./helpers/debug.js');
debug.on = true;
debug.multivote(true);
debug.autolog(true);
//debug.localDb(true);
//global.debug.setUser({name: 'Bob'});

//set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//set up app to use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    }));
app.use(passport.initialize());
app.use(passport.session());    


//set up routes
app.use(require('./routes/index.js'));

//default route if not found
app.use((req, res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.end('404: Page Not Found');
    }
    if(req.accepts('json')){
        res.end(JSON.stringify({error: 'not found'}));
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
});

//establish connection to database
db.connect( process.env.DATABASE, (err, db) =>{
    if(err){
        console.log('Database error: ' + err);
    } else {
        console.log('Successful database connection');
        //setup passport strategy for authentification
        passport.serializeUser((user, done) => {
          done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
           usersDb.getUser(id, done);
        });
        
        passport.use(new TwitterStrategy({
            consumerKey: process.env.TWITTER_CLIENT_ID,  
            consumerSecret: process.env.TWITTER_CLIENT_SECRET, 
            callbackURL: 'https://crh-voteing-app.herokuapp.com/auth/twitter/return' //need to set up path for auth/twitter
          },
          function(token, tokenSecret, profile, cb) {
              debug.log(profile);
              //Database logic here with callback containing our user object              
              usersDb.update(profile, cb);
          }
        ));

        //start server
        app.listen(PORT, ()=>{
            console.log('listening on port: ' + PORT);
        }); 
            

    }
});



