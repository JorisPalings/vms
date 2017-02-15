var db = require('../db');
var mongoose = require('mongoose');

var company = new mongoose.Schema({
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

module.exports = mongoose.model('Company', company);

function arrayLimit(val) {
  return val.length > 0;
}