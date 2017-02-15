'use strict'

const expect = require('chai').expect;
const Company = require('../models/company');
const External = require('../models/persons');
const Location = require('../models/location');
const db = require('../db');

describe('Company', function() {
    it('should be invalid if name is empty', function(done) {
        let company = new Company({
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

    it('should be invalid if contact person is empty', function(done) {
        let company = new Company({
            name: 'Craftworkz',
            location: new Location({
                address:"Gaston Geenslaan 11 B4", postalCode:3000, country:"BEL"
            })
        });
 
        company.validate(function(err) {
            expect(err.errors.contactPerson).to.exist;
            done();
        });
    });

    it('should be invalid if contact person array has length 0', function(done) {
        let company = new Company({
            name: 'Craftworkz',
            contactPerson: [],
            location: new Location({
                address:"Gaston Geenslaan 11 B4", postalCode:3000, country:"BEL"
            })
        });
 
        company.validate(function(err) {
            expect(err.errors.contactPerson).to.exist;
            done();
        });
    });

    it('should be invalid if location is empty', function(done) {
        let company = new Company({
            name: 'Craftworkz',
            contactPerson: new External({
                name:"Georges Petrofski", pictureURL:"url", email:"e-mail", company:this
            })
        });
 
        company.validate(function(err) {
            expect(err.errors.location).to.exist;
            done();
        });
    });
    it('should be valid if everything is complete', function(){
        let company = new Company({
            name: 'Craftworkz',
            contactPerson: new External({
                name:"Georges Petrofski", pictureURL:"url", email:"e-mail", company:this
            }),
            location: new Location({
                address:"Gaston Geenslaan 11 B4", postalCode:3000, country:"BEL"
            })
        });

        company.save(function(err){
            expect(err).to.not.exist;
        });

        company.remove(function(err){
            expect(err).to.not.exist;
        });

        company.validate(function(err){
            expect(err).to.not.exist;
        });
    });   
});