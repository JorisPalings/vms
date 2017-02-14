var db = require('../db');
var mongoose = require('mongoose');

var note = new mongoose.Schema({
    //Will save it as a simple string for now
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        //Added a default Date for now, will possibly delete it later!
        default: Date.now,
        required: true
    },
    meeting: {type: [mongoose.Schema.Types.ObjectId], ref: 'Meeting'},
    author: {type: [mongoose.Schema.Types.ObjectId], ref: 'Employee'}
});

mongoose.model('Note', note);