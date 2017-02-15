var db = require('../db');
var mongoose = require('mongoose');
var util = require('util');

var options = { discriminatorKey: 'kind' };

var Schema = mongoose.Schema;

function baseSchema() {
    Schema.apply(this, options);

    this.add({
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
    })
}

util.inherits(baseSchema, Schema);

var employeeSchema = new baseSchema({
    hashedPassword: {
        type: String,
        required: true
    }
});

var externalSchema = new baseSchema({
    company: {type: [mongoose.Schema.Types.ObjectId], ref: 'Company'}
});

var personSchema = new baseSchema();
var Person = mongoose.model('Person', personSchema);
module.exports = Person;
//discriminator is used for stating that a class is a subclass of another class
Person.discriminator('Employee', employeeSchema);
Person.discriminator('External', externalSchema);