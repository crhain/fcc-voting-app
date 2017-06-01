//load middleware
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//load db handler
const db = require('./database.js');
//load route handlers
const index = require('./routes/index.js');
const polls = require('./routes/polls.js');
const myPolls = require('./routes/my-polls.js');
const newPoll = require('./routes/new-poll.js');
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
            {option: 'George Washington', count: 0},
            {option: "Lincoln", count: 0}
        ]
    }, 
    {
        _id: '3', 
        name: 'programming languages', 
        by: "Carl",
        pollOptions: [
            {option: 'JavaScript', count: 5},
            {option: 'C++', count: 2},
            {option: 'PHP', count: 1},
            {option: 'Java', count: 2},
            {option: 'C#', count: 3},
            {option: 'Ruby', count: 1},
            {option: 'Python', count: 4}
            
        ]
    },
    {
        _id: '4', 
        name: 'food', 
        by: "Carl",
        pollOptions:[
            {option: 'Pasta', count: 0},
            {option: 'Ceral', count: 0}
        ]
    }
];
global.mypolls = [
    {
        _id: '3', 
        name: 'programming languages', 
        by: "Carl",
        pollOptions: [
            {option: 'JavaScript', count: 0},
            {option: 'C++', count: 0},
            {option: 'PHP', count: 0}
        ]
    },
    {
        _id: '4', 
        name: 'food', 
        by: "Carl",
        pollOptions:[
            {option: 'Pasta', count: 0},
            {option: 'Ceral', count: 0}
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
//basic route
app.use('/', index);
app.use('/polls', polls);
app.use('/mypolls', myPolls);
app.use('/newpoll', newPoll);

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
