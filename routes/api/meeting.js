var router = require('express').Router();
var request = require('request');

var getAll = function(req, res, next) {
    console.log(req.body.access_token);
    request("http://localhost:4000/api/employees/getMeetings?name=nvv&access_token=uRM2Kw2GOj7azX8bXO4ArpPjeqGmDcQS1Nph0YEnaQTG9tsFkhqtyLF18r5ZGGnH", function(error, response, body) {
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
