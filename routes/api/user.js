'use strict';

var router = require('express').Router();
var request = require('request');

function handleError(res, response) {
    if (response === undefined) {
        res.status(503).send({ error: 'No response from server. Please try again later.' });
    } else {
        var error = JSON.parse(response.body).error;
        //Throw error to the Angular request
        if (error.details !== undefined && error.details[0] !== undefined) {
            res.status(error.statusCode).send({ error: error.details[0].message });
        } else {
            res.status(error.statusCode).send({ error: error.message });
        }
    }
}

var googlecalendars = function(req, res, next) {

    var data = req.body;
    console.log("4 -  user.js", data);

    // Send the credentials to the loopback API
    request("http://localhost:4000/api/employees/getCalendars?name=" + data.email + "&access_token=" + data.access_token, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(response.body);
        } else {
            handleError(res, response);
        }
    })
}

var linkcals = function(req, res, next) {
    // Send patch request to Loopback API
    let data = req.body;
    let calendars = data.calendars;
    let id = data.id;
    let token = data.token;

    request({
        uri: "http://localhost:4000/api/employees/" + id + "?access_token=" + token,
        method: "PATCH",
        form: calendars
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(response.body);
        } else {
            handleError(res, response);
        }
    })
}

var calendars = function(req, res, next) {
    var data = req.body;

    // Send the credentials to the loopback API
    request("http://localhost:4000/api/employees/" + data.id + "?access_token=" + data.access_token, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(response.body);
        } else {
            handleError(res, response);
        }
    })
}

var user = function(req, res, next) {
    let data = req.body;
    let id = data.id;
    let token = data.token;

    request("http://localhost:4000/api/employees/" + id + "?access_token=" + token, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(response.body);
        } else {
            handleError(res, response);
        }
    })
}

var update_external = function(req, res, next) {
    let data = req.body;

    let id = data.id;
    let token = data.token;

    let externalData = {
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        companyName: data.company,
        phone: data.phone
    }

    console.log(externalData);


    request({
        uri: "http://localhost:4000/api/externals/" + id + "?access_token=" + token,
        method: "PATCH",
        form: externalData
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(response.body);
        } else {
            console.log(response);
            handleError(res, response);
        }
    })


}

var userData = {
    googlecalendars: googlecalendars,
    linkcals: linkcals,
    calendars: calendars,
    user: user,
    update_external: update_external
}

module.exports = userData;