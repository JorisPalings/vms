'use strict'

const db = require('../db');
const mongoose = require('mongoose');

let note = new mongoose.Schema({
    //Will save it as a simple string for now
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        //Added a default Date for now, will possibly delete it later!
        default: Date.now
    },
    meeting: {type: [mongoose.Schema.Types.ObjectId], ref: 'Meeting', required: true},
    author: {type: [mongoose.Schema.Types.ObjectId], ref: 'Employee', required: true}
});

note.index({content: 1, date: 1, meeting: 1, author: 1}, {unique: true});

module.exports = mongoose.model('Note', note);