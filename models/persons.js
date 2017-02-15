'use strict'

const db = require('../db');
const mongoose = require('mongoose');
const util = require('util');

const options = { discriminatorKey: 'kind' };

const Schema = mongoose.Schema;

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

let employeeSchema = new baseSchema({
    hashedPassword: {
        type: String,
        required: true
    }
});

let externalSchema = new baseSchema({
    company: {type: [mongoose.Schema.Types.ObjectId], ref: 'Company'}
});

let personSchema = new baseSchema();
let Person = mongoose.model('Person', personSchema);
module.exports = Person;
//discriminator is used for stating that a class is a subclass of another class
Person.discriminator('Employee', employeeSchema);
Person.discriminator('External', externalSchema);