var expect = require('chai').expect;
var Company = require('../models/company');

describe('Company', function() {
    it('should be invalid if name is empty', function(done) {
        var company = new Company({
            
        });
 
        company.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
});