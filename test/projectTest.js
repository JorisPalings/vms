var expect = require('chai').expect;
var Project = require('../models/Project');

describe('Project', function(){
    it('should be invalid if name is empty', function(done){
        var product = new Project();

        product.validate(function(err){
            expect(err.errors.name).to.exist;
            done();
        });
    });
});