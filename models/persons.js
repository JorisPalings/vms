var db = require('../db');
var mongoose = require('mongoose');

var options = { discriminatorKey: 'kind' };

var person = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pictureURL: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    }
}, options);

var employee = new mongoose.Schema({
    hashedPassword: {
        type: String,
        required: true
    }
}, options);

var external = new mongoose.Schema({
    company: {type: [mongoose.Schema.Types.ObjectId], ref: 'Company'}
}, options);

module.exports = mongoose.model('Person', person);
//discriminator is used for stating that a class is a subclass of another class
Person.discriminator('Employee', employee);
Person.discriminator('External', external);