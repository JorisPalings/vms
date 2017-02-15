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

module.exports = mongoose.model('Location', location);