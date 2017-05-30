//load middleware
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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
    {_id: '1', name: 'presidents'}, 
    {_id: '2', name: 'friends'},
    {_id: '3', name: 'programming languages'},
    {_id: '4', name: 'food'}
];
global.mypolls = [
    {_id: '3', name: 'programming languages'},
    {_id: '4', name: 'food'}
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
//Note: can check if logged in using if(req.user){} because passport only passes user to req if logged in
//If logged in pass context to handlebars {user: udefined/name}
app.use('/', index);
app.use('/polls', polls);
app.use('/mypolls', myPolls);
app.use('/newpoll', newPoll);

/*app.get('/polls/:id', (req, res, next)=>{
    var id = req.params.id;    
    res.render('poll', {name: id});
});*/



app.listen(PORT, ()=>{
    console.log('listening on port: ' + PORT);
});