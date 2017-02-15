var expect = require('chai').expect;
var Company = require('../models/company');
var External = require('../models/persons');
var Location = require('../models/location');

describe('Company', function() {
    it('should be invalid if name is empty', function(done) {
        var company = new Company({
            contactPerson: new External({
                name:"Georges Petrofski", pictureURL:"url", email:"e-mail", company:this
            }),
            location: new Location({
                address:"Gaston Geenslaan 11 B4", postalCode:3000, country:"BEL"
            })
        });
 
        company.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
});