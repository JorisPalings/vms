'use strict'

const expect = require('chai').expect;
const Meeting = require('../models/meeting');
const Note = require('../models/note');
const Employee = require('../models/persons');
const External = require('../models/persons');
const Project = require('../models/project');
const Company = require('../models/company');
const Location = require('../models/location');

describe('Meeting', function() {
    it('should be invalid if room is empty', function(done) {
        let employee = new Employee({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", hashedPassword:"imahacker"});
        let external = new External({name:"Nick Van Vynckt", pictureURL:"url", email:"e-mail", company: new Company({name: 'Craftworkz',contactPerson: new External({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", company:this}),
            location: new Location({
                address:"Gaston Geenslaan 11 B4", postalCode:3000, country:"BEL"
            })})});
        let meeting = undefined;
        meeting = new Meeting({
           date: Date.now,
           notes: [new Note({content:"This is a note!", date:Date.now, meeting:meeting, author:employee})],
           meetee: [employee],
           external: [external],
           project: new Project({name:"3D printing", budget:300, meetings:[meeting]})
        });
 
        meeting.validate(function(err) {
            expect(err.errors.room).to.exist;
            done();
        });
    });

    it('should be invalid if date is empty', function(done) {
        let employee = new Employee({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", hashedPassword:"imahacker"});
        let external = new External({name:"Nick Van Vynckt", pictureURL:"url", email:"e-mail", company: new Company({name: 'Craftworkz',contactPerson: new External({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", company:this}),
            location: new Location({
                address:"Gaston Geenslaan 11 B4", postalCode:3000, country:"BEL"
            })})});
        let meeting = undefined;
        meeting = new Meeting({
           room: "Cho Oyu",
           notes: [new Note({content:"This is a note!", date:Date.now, meeting:meeting, author:employee})],
           meetee: [employee],
           external: [external],
           project: new Project({name:"3D printing", budget:300, meetings:[meeting]})
        });
 
        meeting.validate(function(err) {
            expect(err.errors.date).to.exist;
            done();
        });
    });

    it('should be invalid if notes is empty', function(done) {
        let employee = new Employee({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", hashedPassword:"imahacker"});
        let external = new External({name:"Nick Van Vynckt", pictureURL:"url", email:"e-mail", company: new Company({name: 'Craftworkz',contactPerson: new External({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", company:this}),
            location: new Location({
                address:"Gaston Geenslaan 11 B4", postalCode:3000, country:"BEL"
            })})});
        let meeting = undefined;
        meeting = new Meeting({
           room: "Cho Oyu",
           date: Date.now,
           meetee: [employee],
           external: [external],
           project: new Project({name:"3D printing", budget:300, meetings:[meeting]})
        });
 
        meeting.validate(function(err) {
            expect(err.errors.notes).to.exist;
            done();
        });
    });

    it('should be invalid if metee is empty', function(done) {
        let employee = new Employee({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", hashedPassword:"imahacker"});
        let external = new External({name:"Nick Van Vynckt", pictureURL:"url", email:"e-mail", company: new Company({name: 'Craftworkz',contactPerson: new External({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", company:this}),
            location: new Location({
                address:"Gaston Geenslaan 11 B4", postalCode:3000, country:"BEL"
            })})});
        let meeting = undefined;
        meeting = new Meeting({
           room: "Cho Oyu",
           date: Date.now,
           external: [external],
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
        let external = new External({name:"Nick Van Vynckt", pictureURL:"url", email:"e-mail", company: new Company({name: 'Craftworkz',contactPerson: new External({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", company:this}),
            location: new Location({
                address:"Gaston Geenslaan 11 B4", postalCode:3000, country:"BEL"
            })})});
        let meeting = undefined;
        meeting = new Meeting({
           room: "Cho Oyu",
           date: Date.now,
           meetee: [employee],
           external: [external],
           notes: [new Note({content:"This is a note!", date:Date.now, meeting:meeting, author:employee})],
        });
 
        meeting.validate(function(err) {
            expect(err.errors.project).to.exist;
            done();
        });
    });

    it('should be invalid if external is empty', function(done) {
        let employee = new Employee({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", hashedPassword:"imahacker"});
        let meeting = undefined;
        meeting = new Meeting({
           room: "Cho Oyu",
           date: Date.now,
           meetee: [employee],
           notes: [new Note({content:"This is a note!", date:Date.now, meeting:meeting, author:employee})],
           project: new Project({name:"3D printing", budget:300, meetings:[meeting]})
        });
 
        meeting.validate(function(err) {
            expect(err.errors.external).to.exist;
            done();
        });
    });

    it('should be valid when everything is complete', function(){
        let employee = new Employee({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", hashedPassword:"imahacker"});
        let external = new External({name:"Nick Van Vynckt", pictureURL:"url", email:"e-mail", company: new Company({name: 'Craftworkz',contactPerson: new External({name:"Georges Petrofski", pictureURL:"url", email:"e-mail", company:this}),
            location: new Location({
                address:"Gaston Geenslaan 11 B4", postalCode:3000, country:"BEL"
            })})});
        let meeting = undefined;
        meeting = new Meeting({
           room: "Cho Oyu",
           date: Date.now,
           meetee: [employee],
           external: [external],
           notes: [new Note({content:"This is a note!", date:Date.now, meeting:meeting, author:employee})],
           project: new Project({name:"3D printing", budget:300, meetings:[meeting]})
        });

        meeting.save(function(err){
            expect(err).to.not.exist;
        });

        meeting.remove(function(err){
            expect(err).to.not.exist;
        });

        meeting.validate(function(err){
            expect(err).to.not.exist;
            done();
        });
    });
});