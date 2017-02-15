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
        required: true
    },
    notes: {
        type:[{type: [mongoose.Schema.Types.ObjectId], ref: 'Note'}],
        required:true
    },
    meetee: {
        type:[{type: [mongoose.Schema.Types.ObjectId], ref: 'Employee'}],
        required:true,
        validate: [arrayLimit, '{PATH} cannot be 0']
    },
    project: {type: [mongoose.Schema.Types.ObjectId], ref: 'Project', required:true}
});

module.exports = mongoose.model('Meeting', meeting);

function arrayLimit(val) {
  return val.length > 0;
}