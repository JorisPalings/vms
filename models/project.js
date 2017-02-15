'use strict'

const db = require('../db');
const mongoose = require('mongoose');

let project = new mongoose.Schema({
     name: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    meetings: [{type: [mongoose.Schema.Types.ObjectId], ref: 'Meeting'}]
});

module.exports = mongoose.model('Project', project);