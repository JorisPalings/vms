'use strict'

const expect = require('chai').expect;
const Project = require('../models/project');
const Meeting = require('../models/meeting');

describe('Project', function(){
    it('should be invalid if name is empty', function(done){
        let projectEmptyName = new Project({
            budget: 500
        });
        projectEmptyName.validate(function(err){
            expect(err.errors.name).to.exist;
            done();
        });
    });
    it('should be invalid if budget is empty', function(done){
        let projectEmptyBudget = new Project({
            name: "VMS"
        });
        projectEmptyBudget.validate(function(err){
            expect(err.errors.budget).to.exist;
            done();
        });
    });
    it('should have an array of meetings and be valid', function(done){
        let completeProject = new Project({
            name: "VMS",
            budget: 500,
            meetings: [new Meeting({
                room: "Everest",
                date: Date.now
            }), new Meeting({
                room: "Kilimanjaro",
                date: Date.now
            })]
        });
        completeProject.validate(function(err){
            expect(err).to.not.exist;
            done();
        })
    });
});