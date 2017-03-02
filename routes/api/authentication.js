var router = require('express').Router();
var request = require('request');

var login = function(req, res, next) {
  // Make sure the JSON is correct
  var credentials = {
    "email": req.body.mail,
    "password": req.body.password
  }

  // Send the credentials to the loopback API
  request({
    uri: "http://localhost:4000/api/employees/login",
    method: "POST",
    form: credentials
  },function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.status(200).send(response.body);
    }
    else {
      var error = JSON.parse(response.body).error;
      //Throw error to the Angular request
      res.status(error.statusCode).send({error: error.message});
    }
  })
}

var register = function(req, res, next) {
  var data = req.body;

  //Transform the json to the right format
  var user = {
    "fname": data.firstname,
    "lname": data.lastname,
    "email": data.mail,
    "password": data.password
  }

  // Send the data to the loopback API
  request({
    uri: "http://localhost:4000/api/employees",
    method: "POST",
    form: user
  },function(error, response, body) {
    if (!error && response.statusCode == 200) {
      //TODO: Do something with the response json and go to the next step
      res.status(200).send({success: "Your account has been created"});
    }
    else {
      var error = JSON.parse(response.body).error;
      //Throw error to the Angular request
      res.status(error.statusCode).send({error: error.message});
    }
  })
}

var update = function(req, res, next) {
  var data = req.body;

  //Transform the json to the right format
  var user = {
    "fname": data.fname,
    "lname": data.lname,
    "email": data.email
  }

  // Send the data to the loopback API
  request({
    uri: "http://localhost:4000/api/employees/" + data.id + "?access_token=" + data.token,
    method: "PATCH",
    form: user
  },function(error, response, body) {
    if (!error && response.statusCode == 200) {
      //TODO: Do something with the response json and go to the next step
      res.status(200).send({success: "Your account has been updated"});
    }
    else {
      var error = JSON.parse(response.body).error;
      //Throw error to the Angular request
      res.status(error.statusCode).send({error: error.message});
    }
  })
}

var logout = function(req, res, next) {
  var data = req.body;

  request({
    uri: "http://localhost:4000/api/employees/logout?access_token=" + data.token,
    method: "POST"
  },function(error, response, body) {
    if (!error && response.statusCode === 204) {
      res.status(204).send(response.body);
    }
    else {
      var error = JSON.parse(response.body).error;
      //Throw error to the Angular request
      res.status(error.statusCode).send({error: error.message});
    }
  })

}

var auth = {
  login: login,
  register: register,
  logout: logout,
  update: update
}

module.exports = auth;
