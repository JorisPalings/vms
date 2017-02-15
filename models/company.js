'use strict'

const db = require('../db');
const mongoose = require('mongoose');

let company = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactPerson: {
        type: [{type: [mongoose.Schema.Types.ObjectId], ref: 'External'}],
        validate: [arrayLimit, '{PATH} cannot be 0'],
        required: true
    },
    location: {type: [mongoose.Schema.Types.ObjectId], ref: 'Location', required: true}
});

company.index({ name: 1, contactPerson: 1, location: 1}, {unique: true});

module.exports = mongoose.model('Company', company);

function arrayLimit(val) {
  return val.length > 0;
}
