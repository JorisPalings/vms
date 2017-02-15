'use strict'

const expect = require('chai').expect;
const Meeting = require('../models/meeting');
const Note = require('../models/note');
const Employee = require('../models/persons');
const Project = require('../models/project');

describe('Meeting', function() {
    it('should be invalid if room is empty', function(done) {
        let employee = new Employee({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", hashedPassword:"imahacker"});
        let meeting = new Meeting({
           date: Date.now,
           notes: [new Note({content:"This is a note!", date:Date.now, meeting:meeting, author:employee})],
           meetee: [employee],
           project: new Project({name:"3D printing", budget:300, meetings:[meeting]})
        });
 
        meeting.validate(function(err) {
            expect(err.errors.room).to.exist;
            done();
        });
    });

    it('should be invalid if date is empty', function(done) {
        let employee = new Employee({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", hashedPassword:"imahacker"});
        let meeting = new Meeting({
           room: "Cho Oyu",
           notes: [new Note({content:"This is a note!", date:Date.now, meeting:meeting, author:employee})],
           meetee: [employee],
           project: new Project({name:"3D printing", budget:300, meetings:[meeting]})
        });
 
        meeting.validate(function(err) {
            expect(err.errors.date).to.exist;
            done();
        });
    });

    it('should be invalid if notes is empty', function(done) {
        let employee = new Employee({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", hashedPassword:"imahacker"});
        let meeting = new Meeting({
           room: "Cho Oyu",
           date: Date.now,
           meetee: [employee],
           project: new Project({name:"3D printing", budget:300, meetings:[meeting]})
        });
 
        meeting.validate(function(err) {
            expect(err.errors.notes).to.exist;
            done();
        });
    });

    it('should be invalid if metee is empty', function(done) {
        let employee = new Employee({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", hashedPassword:"imahacker"});
        let meeting = new Meeting({
           room: "Cho Oyu",
           date: Date.now,
           notes: [new Note({content:"This is a note!", date:Date.now, meeting:meeting, author:employee})],
           project: new Project({name:"3D printing", budget:300, meetings:[meeting]})
        });
 
        meeting.validate(function(err) {
            expect(err.errors.meetee).to.exist;
            done();
        });
    });

    it('should be invalid if project is empty', function(done) {
        let employee = new Employee({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", hashedPassword:"imahacker"});
        let meeting = new Meeting({
           room: "Cho Oyu",
           date: Date.now,
           meetee: [employee],
           notes: [new Note({content:"This is a note!", date:Date.now, meeting:meeting, author:employee})],
        });
 
        meeting.validate(function(err) {
            expect(err.errors.project).to.exist;
            done();
        });
    });
});