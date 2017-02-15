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
        default: Date.now,
        required: true
    },
    meeting: {type: [mongoose.Schema.Types.ObjectId], ref: 'Meeting'},
    author: {type: [mongoose.Schema.Types.ObjectId], ref: 'Employee'}
});

module.exports = mongoose.model('Note', note);