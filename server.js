// server.js

//modules
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var express_validator = require('express-validator');

var port = 3000;

var app = express();

//view engine
app.set('views', path.join(__dirname, 'views'));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/static', require('./controllers/static_routes.js'));

app.listen(port, function(){
    console.log('Server started on port ' + port);
});