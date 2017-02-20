// server.js

//modules
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var port = 3000;

var app = express();

//view engine
app.set('views', path.join(__dirname, 'views'));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', require('./routes/api/routes'));
app.use(require('./routes/static_routes'));


app.listen(port, function(){
    console.log('Server started on port ' + port);
});
