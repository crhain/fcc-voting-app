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

/*app.get('/polls/:id', (req, res, next)=>{
    var id = req.params.id;    
    res.render('poll', {name: id});
});*/



app.listen(PORT, ()=>{
    console.log('listening on port: ' + PORT);
});