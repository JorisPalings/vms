var router = require('express').Router();
var request = require('request');

var getAll = function(req, res, next) {
    request("http://localhost:4000/api/employees/getMeetings?name="+req.body.name+"&access_token="+req.body.access_token, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(response.body);
        } else {
            var error = JSON.parse(response.body).error;
            //Throw error to the Angular request
            res.status(error.statusCode).send({error: error.message});
        }
    });
}

var getMeeting = function(req, res, next) {
    request("http://localhost:4000/api/meetings/"+req.body.id+"?access_token="+req.body.access_token, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(response.body);
        } else {
            var error = JSON.parse(response.body).error;
            //Throw error to the Angular request
            res.status(error.statusCode).send({error: error.message});
        }
    });
}

var getExternals = function(req, res, next) {
    request("http://localhost:4000/api/meetings/"+req.body.id+"/externals?access_token="+req.body.access_token, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(response.body);
        } else {
            var error = JSON.parse(response.body).error;
            //Throw error to the Angular request
            res.status(error.statusCode).send({error: error.message});
        }
    });
}

var meeting = {
    getAll: getAll,
    getMeeting: getMeeting,
    getExternals: getExternals
}

module.exports = meeting;
