var db = require('../db');
var mongoose = require('mongoose');

var project = new mongoose.Schema({
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

mongoose.model('Project', project);