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
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(response.body);
        } else {
            handleError(res, response);
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
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //TODO: Do something with the response json and go to the next step
            res.status(200).send({ success: "Your account has been created" });
        } else {
            handleError(res, response);
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
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //TODO: Do something with the response json and go to the next step
            res.status(200).send({ success: "Your account has been updated" });
        } else {
            handleError(res, response);
        }
    })
}

var logout = function(req, res, next) {
    var data = req.body;

    request({
        uri: "http://localhost:4000/api/employees/logout?access_token=" + data.token,
        method: "POST"
    }, function(error, response, body) {
        if (!error && response.statusCode === 204) {
            res.status(204).send(response.body);
        } else {
            handleError(res, response);
        }
    })
}

var deleteAccount = function(req, res, next) {
    var data = req.body;
    console.log(data);
    request({
        uri: "http://localhost:4000/api/employees/removeAllData?id=" + data.id + "&access_token=" + data.token,
        method: "DELETE"
    }, function(error, response, body) {
        if (!error && response.statusCode === 204) {
            //Do something with the response json and go to the next step
            console.log("Delete Response", response.body);
            res.status(204).send(response.body);
        } else {
            console.log("body", response.body);
            handleError(res, response);
        }
    })
}

var integrations = function(req, res, next) {
    var data = req.body;
    // Send the credentials to the loopback API
    request({
        uri: "http://localhost:4000/api/employees/integrations?id=" + data.id + "&access_token=" + data.token,
        method: "GET"
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(response.body);
        } else {
            handleError(res, response);
        }
    })
}

var auth = {
    login: login,
    register: register,
    logout: logout,
    update: update,
    deleteAccount: deleteAccount,
    integrations: integrations
}

module.exports = auth;