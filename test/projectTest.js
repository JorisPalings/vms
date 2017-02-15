var expect = require('chai').expect;
var Project = require('../models/project');
var Meeting = require('../models/meeting');

describe('Project', function(){
    it('should be invalid if name is empty', function(done){
        var projectEmptyName = new Project({
            budget: 500
        });
        projectEmptyName.validate(function(err){
            expect(err.errors.name).to.exist;
            done();
        });
    });
    it('should be invalid if budget is empty', function(done){
        var projectEmptyBudget = new Project({
            name: "VMS"
        });
        projectEmptyBudget.validate(function(err){
            expect(err.errors.budget).to.exist;
            done();
        });
    });
    it('should have an array of meetings', function(done){
        var completeProject = new Project({
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