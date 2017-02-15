'use strict'

const db = require('../db');
const mongoose = require('mongoose');

let location = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true,
        maxlength: 3
    }
});

location.index({ address: 1, postalCode: 1, country: 1}, {unique: true});

module.exports = mongoose.model('Location', location);