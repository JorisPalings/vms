var expect = require('chai').expect;
var Project = require('../models/project');

describe('Project', function(){
    it('should be invalid if name is empty', function(done){
        var project = new Project({
            
        });
        project.validate(function(err){
            expect(err.errors.name).to.exist;
            done();
        });
    });
});