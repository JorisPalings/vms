var router = require('express').Router();
var request = require('request');

var getAll = function(req, res, next) {
    console.log(req.body.access_token);
    request("http://localhost:4000/api/meetings?access_token=nc8LJga6pmhYHWIIQKtF7R6Hzox9goRFSCcrFyncl0pfneKPvCmFVGUkM2Sr5YPP", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            //Do something with the response json and go to the next step
            res.status(200).send(response.body);
        } else {
            var error = JSON.parse(response.body).error;

            //Throw error to the Angular request
            res.status(error.statusCode).send({error: error.message});
        }
    });
}

var meeting = {
    getAll: getAll
}

module.exports = meeting;
