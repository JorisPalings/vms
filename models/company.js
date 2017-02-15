'use strict'

const db = require('../db');
const mongoose = require('mongoose');

let company = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactPerson: [{type: [mongoose.Schema.Types.ObjectId], ref: 'External'}],
    location: {type: [mongoose.Schema.Types.ObjectId], ref: 'Location'}
});

module.exports = mongoose.model('Company', company);