var router = require('express').Router();
var request = require('request');

function handleError(res, response) {
    if (response === undefined) {
        res.status(503).send({ error: 'No response from server. Please try again later.' });
    } else {
        var error = JSON.parse(response.body).error;
        //Throw error to the Angular request
        res.status(error.statusCode).send({ error: error.message });
    }
}

var getAll = function(req, res, next) {
    request("http://localhost:4000/api/projects?access_token=" + req.body.access_token, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(response.body);
        } else {
            handleError(res, response);
        }
    });
}

var getMeetingsForProject = function(req, res, next) {
    request("http://localhost:4000/api/projects/" + req.body.id + "/meetings?access_token=" + req.body.access_token, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(response.body);
        } else {
            handleError(res, response);
        }
    });
}

var getNotesForMeetingForProject = function(req, res, next) {
    request("http://localhost:4000/api/projects/" + req.body.id + "/information?access_token=" + req.body.access_token, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(response.body);
        } else {
            handleError(res, response);
        }
    });
}

var project = {
    getAll: getAll,
    getMeetingsForProject: getMeetingsForProject,
    getNotesForMeetingForProject: getNotesForMeetingForProject
}

module.exports = project;