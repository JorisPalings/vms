var db = require('../db');
var mongoose = require('mongoose');

var company = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactPerson: [{type: [mongoose.Schema.Types.ObjectId], ref: 'External'}],
    location: {type: [mongoose.Schema.Types.ObjectId], ref: 'Location'}
});

mongoose.model('Company', company);