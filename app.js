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
const index             = require('./routes/index.js');
//create express app
const app               = express();
//get port
const PORT              = process.env.PORT || 3000;
require('./helpers/debug.js');
global.debug.on = true;
debug.multivote = false;
//global.debug.autolog = false;
global.debug.setUser({name: 'Bob'});

//set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//set up app to use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(require('./middlewares/users'));
//app.use('/', index);
//set up routes
app.use(require('./routes/index.js'));

//establish connection to database
db.connect(process.env.DATABASE, (err, db) =>{
    if(err){
        console.log('Database error: ' + err);
    } else {
        console.log('Successful database connection');
        //setup passport strategy for authentification
        app.use(session({
          secret: process.env.SESSION_SECRET,
          resave: true,
          saveUninitialized: true,
        }));
        app.use(passport.initialize());
        app.use(passport.session());

        function ensureAuthenticated(req, res, next) {
          if (req.isAuthenticated()) {
              return next();
          }
          res.redirect('/');
        };

        passport.serializeUser((user, done) => {
          done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            db.collection('users').findOne(
                {id: id},
                (err, doc) => {
                    done(null, doc);
                }
            );
        });
        
        passport.use(new TwitterStrategy({
            consumerKey: process.env.TWITTER_CLIENT_ID,  
            consumerSecret: process.env.TWITTER_CLIENT_SECRET, 
            callbackURL: 'https://crh-voteing-app.herokuapp.com/auth/twitter/return' //need to set up path for auth/twitter
          },
          function(token, tokenSecret, profile, cb) {
              debug.log(profile);
              //Database logic here with callback containing our user object
              db.collection('users').findAndModify( 
                {id: profile.id},
                {},
                {$setOnInsert:{
                    id: profile.id,
                    name: profile.displayName || 'John Doe',
                    photo: profile.photos ? profile.photos[0].value : '',
                    email: profile.emails ? profile.emails[0].value : 'No public email',
                    created_on: new Date(),
                    provider: profile.provider || ''
                },$set:{
                    last_login: new Date()
                },$inc:{
                    login_count: 1
                }},
                {upsert:true, new: true},
                (err, doc) => {
                    return cb(null, doc.value);
                }
              );
          }
        ));

        //start server
        app.listen(PORT, ()=>{
            console.log('listening on port: ' + PORT);
        });     

    }
});
