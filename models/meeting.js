'use strict'

const db = require('../db');
const mongoose = require('mongoose');

let meeting = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        //Added a default Date for now, will possibly delete it later!
        default: Date.now,
        required: true
    },
    notes: [{type: [mongoose.Schema.Types.ObjectId], ref: 'Note'}],
    meetee: [{type: [mongoose.Schema.Types.ObjectId], ref: 'Person'}],
    project: {type: [mongoose.Schema.Types.ObjectId], ref: 'Project'}
});

module.exports = mongoose.model('Meeting', meeting);