var db = require('../db');
var mongoose = require('mongoose');

var location = new mongoose.Schema({
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
        required: true
    }
});

mongoose.model('Location', location);