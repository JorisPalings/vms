'use strict'

const expect = require('chai').expect;
const Location = require('../models/location');

describe('Location', function(){
    it('should be invalid if address is empty', function(done){
        let locationEmptyAddress = new Location({
            postalCode: 3150,
            country: "BEL"
        });
        locationEmptyAddress.validate(function(err){
            expect(err.errors.address).to.exist;
            done();
        });
    });
    it('should be invalid if postalCode is empty', function(done){
        let locationEmptyPostalCode = new Location({
            address: "Haachtsestraatje 9",
            country: "BEL"
        });
        locationEmptyPostalCode.validate(function(err){
            expect(err.errors.postalCode).to.exist;
            done();
        });
    });
    it('should be invalid if country is empty', function(done){
        let locationEmptyCountry = new Location({
            address: "Haachtsestraatje 9",
            postalCode: 3150
        });
        locationEmptyCountry.validate(function(err){
            expect(err.errors.country).to.exist;
            done();
        });
    });
    it('should be invalid if country field is too long', function(done){
        let locationCountryFieldTooLong = new Location({
            address: "Haachtsestraatje 9",
            postalCode: 3150,
            country: "BELGIUM"
        });
        locationCountryFieldTooLong.validate(function(err){
            expect(err.errors.country).to.exist;
            done();
        });
    });
    it('should be valid if everything is complete', function(done){
        let locationComplete = new Location({
            address: "Haachtsestraatje 9",
            postalCode: 3150,
            country: "BEL"
        });

        locationComplete.save(function(err){
            expect(err).to.not.exist;
        });

        locationComplete.remove(function(err){
            expect(err).to.not.exist;
        });

        locationComplete.validate(function(err){
            expect(err).to.not.exist;
            done();
        });
    });
});