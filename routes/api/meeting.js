'use strict';

var router = require('express').Router();
var request = require('request');

var getAll = function(req, res, next) {
    request("http://localhost:4000/api/meetings/all", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(response.body);
        } else {
            var error = JSON.parse(response.body).error;
            //Throw error to the Angular request
            res.status(error.statusCode).send({error: error.message});
        }
    });
}

var getAllForOne = function(req, res, next) {
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

var addNote = function(req, res, next){
  let data = req.body;
  let meetingId = req.body.meetingId;
  let authorId = req.body.authorId;

  let content = req.body.content;

  let notesData = {
    meetingId: meetingId,
    content: content,
    authorId: authorId
  }

  console.log(data.isNew);

  if (data.isNew){
    console.log("Posting new note");
    //TODO: Send a post request
    request({
      uri: "http://localhost:4000/api/notes/?access_token=" + data.access_token,
      method: "POST",
      form: notesData
    },function(error, response, body) {
      if (!error && response.statusCode === 200) {
        res.status(200).send(response.body);
      }
      else {
        var error = JSON.parse(response.body).error;
        //Throw error to the Angular request
        console.log(error);
        res.status(error.statusCode).send(error);
      }
    })

  }
  else {
    // Set the note id
    console.log("Patching the note");

    //TODO: Send a patch request
    request({
      uri: "http://localhost:4000/api/notes/" + data.id + "?access_token=" + data.access_token,
      method: "PATCH",
      form: notesData
    },function(error, response, body) {
      if (!error && response.statusCode === 200) {
        res.status(200).send(response.body);
      }
      else {
        var error = JSON.parse(response.body).error;
        //Throw error to the Angular request
        console.log(error);
        res.status(error.statusCode).send(error);
      }
    })
  }
}

var getNotes = function(req, res, next){
  let data = req.body;

  let meetingId = req.params.id;
  let token = data.access_token;

  console.log('Sending GET request for notes of meeting with id: ' + meetingId);

  request("http://localhost:4000/api/meetings/" + meetingId + "/notes?access_token=" + token, function(error, response, body) {
      if (!error && response.statusCode === 200) {
          res.status(200).send(response.body);
      }
      else {
          var error = JSON.parse(response.body).error;
          //Throw error to the Angular request
          res.status(error.statusCode).send({error: error.message});
      }
  });
}

var meeting = {
    getAll: getAll,
    getAllForOne: getAllForOne,
    getMeeting: getMeeting,
    getExternals: getExternals,
    saveNote: addNote,
    getNotes: getNotes
}

module.exports = meeting;
