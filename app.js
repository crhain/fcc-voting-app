const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const routes = require('./routes/route.js');
const PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//set directory for static resources
app.use(express.static('public'));

//basic route
routes(app);



app.listen(PORT, ()=>{
    console.log('listening on port: ' + PORT);
});