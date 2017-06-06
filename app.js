//load middleware
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//load db handler
const db = require('./models/database.js');
const index = require('./routes/index.js');
//create express app
const app = express();
//get port
const PORT = process.env.PORT || 3000;
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
        
        //start server
        app.listen(PORT, ()=>{
            console.log('listening on port: ' + PORT);
        });     

    }
});
