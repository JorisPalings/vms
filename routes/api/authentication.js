var router = require('express').Router();

var login = function(req, res, next){
  console.log(req.body);
  // TODO: Send the credentials to the loopback API
}

var register = function(req, res, next){
  // TODO: Send the data to the loopback API
}

var auth = {
  login: login,
  register: register
}

module.exports = auth;
