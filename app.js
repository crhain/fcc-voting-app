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
global.debug = true; //set a variable for debug mode
//This is is just for testing before we get database in place
global.polls = [
    {
        _id: '1', 
        name: 'presidents', 
        by: 'Anne Nomous',
        pollOptions: [
            {id: 0, option: 'George Washington', count: 0},
            {id: 1, option: "Lincoln", count: 0}
        ]
    }, 
    {
        _id: '3', 
        name: 'programming languages', 
        by: "Carl",
        pollOptions: [
            {id: 0, option: 'JavaScript', count: 5},
            {id: 1, option: 'C++', count: 2},
            {id: 2, option: 'PHP', count: 1},
            {id: 3, option: 'Java', count: 2},
            {id: 4, option: 'C#', count: 3},
            {id: 5, option: 'Ruby', count: 1},
            {id: 6, option: 'Python', count: 4}
            
        ]
    },
    {
        _id: '4', 
        name: 'food', 
        by: "Carl",
        pollOptions:[
            {id: 0, option: 'Pasta', count: 0},
            {id: 1, option: 'Ceral', count: 0}
        ]
    }
];


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
        console.log('Succesfful database connection');
        //setup passport strategy for authentification
        
        //start server
        app.listen(PORT, ()=>{
            console.log('listening on port: ' + PORT);
        });     

    }
});
