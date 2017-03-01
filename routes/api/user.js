'use strict';

var router = require('express').Router();
var request = require('request');

var googlecalendars = function(req, res, next){

  var data = req.body;
  console.log("4 -  user.js", data);

  console.log(data.email);
  console.log(data.access_token);

  // Send the credentials to the loopback API
  request("http://localhost:4000/api/employees/getCalendars?name=" + data.email + "&access_token=" + data.access_token, function(error, response, body){
    if (!error && response.statusCode === 200){
      //Do something with the response json and go to the next step
      console.log("Response no error", response.body);
      res.status(200).send(response.body);
    }
    else {
      console.log(response);
      console.log("body with error", response.body);
      var error = JSON.parse(response.body).error;

      //Throw error to the Angular request
      res.status(error.statusCode).send({error: error.message});
    }
  })

}

var linkcals = function(req, res, next){
  // Send patch request to Loopback API

  let data = req.body;

  let calendars = data.calendars;
  let id = data.id;
  let token = data.token;

  console.log(id);
  
  request({
    uri: "http://localhost:4000/api/employees/" + id +"?access_token=" + token,
    method: "PATCH",
    form: calendars
  },function(error, response, body){
    if (!error && response.statusCode === 200){
      //Do something with the response json and go to the next step
      console.log("Response", response.body);
      res.status(200).send(response.body);
    }
    else {
      console.log("body", response.body);
      var error = JSON.parse(response.body).error;

      //Throw error to the Angular request
      res.status(error.statusCode).send({error: error.message});
    }
  })
}

var calendars = function(req, res, next){

  var data = req.body;

  // Send the credentials to the loopback API
  request("http://localhost:4000/api/employees/" + data.id + "?access_token=" + data.access_token, function(error, response, body){
    if (!error && response.statusCode === 200){
      //Do something with the response json and go to the next step
      console.log("Response no error", response.body);
      res.status(200).send(response.body);
    }
    else {
      console.log(response);
      console.log("body with error", response.body);
      var error = JSON.parse(response.body).error;

      //Throw error to the Angular request
      res.status(error.statusCode).send({error: error.message});
    }
  })

}


var userData = {
  googlecalendars: googlecalendars,
  linkcals: linkcals,
  calendars: calendars
}

module.exports = userData;
