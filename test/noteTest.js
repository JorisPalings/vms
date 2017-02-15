'use strict'

const expect = require('chai').expect;
const Note = require('../models/note');
const Meeting = require('../models/meeting');
const Author = require('../models/persons');

describe('Note', function(){
    it('should be invalid if content is empty', function(done){
        let noteEmptyContent = new Note({
            date: Date.now,
            meeting: new Meeting({
                room: "Everest",
                date: Date.now
            }),
            author: new Author({
                name:"Georges Petrofski",
                pictureURL:"url",
                email:"email",
                hashedPassword: "ZYjn1C3nhb3b0woYfOne43Am8U"
            })
        });
        noteEmptyContent.validate(function(err){
            expect(err.errors.content).to.exist;
            done();
        }); 
    });
    it('should be invalid if meeting is empty', function(done){
        let noteEmptyMeeting = new Note({
            content: "This is a note!",
            date: Date.now,
            author: new Author({
                name:"Georges Petrofski",
                pictureURL:"url",
                email:"e-mail",
                hashedPassword: "ZYjn1C3nhb3b0woYfOne43Am8U"
            })
        });
        noteEmptyMeeting.validate(function(err){
            expect(err.errors.meeting).to.exist;
            done();
        });
    });
    it('should be invalid if author is empty', function(done){
        let noteEmptyAuthor = new Note({
            content: "This is a note!",
            date: Date.now,
            meeting: new Meeting({
                room: "Everest",
                date: Date.now
            })
        });
        noteEmptyAuthor.validate(function(err){
            expect(err.errors.author).to.exist;
            done();
        });
    });
    it('should be valid if everything is complete', function(done){
        let noteComplete = new Note({
            content: "This is a note!",
            meeting: new Meeting({
                room: "Everest",
                date: Date.now
            }),
            author: new Author({
                name:"Georges Petrofski",
                pictureURL:"url",
                email:"e-mail",
                hashedPassword: "ZYjn1C3nhb3b0woYfOne43Am8U"
            })
        });
        noteComplete.validate(function(err){
            expect(err).to.not.exist;
            done();
        });
    });
});