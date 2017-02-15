'use strict'

const expect = require('chai').expect;
const External = require('../models/persons');
const Company = require('../models/company');
const Location = require('../models/location');

describe('External', function(){
    it('should be invalid if name is empty', function(){
        let external = new External({
            pictureURL:"url",
            email:"e-mail",
            company: new Company({
                name: 'Craftworkz',
                contactPerson: new External({
                    name:"Georges Petrofski", pictureURL:"url", email:"e-mail", company:this
                }),
                location: new Location({
                    address:"Gaston Geenslaan 11 B4", postalCode:3000, country:"BEL"
                })
            })
        });
        external.validate(function(err){
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it('should be invalid if email is empty', function(){
        let external = new External({
            name:"Georges Petrofski",
            pictureURL:"url",
            hashedPassword:"imahacker"
        });
        external.validate(function(err){
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid if company is empty', function(){
        let external = new External({
            name:"Georges Petrofski",
            pictureURL:"url",
            email:"e-mail",
        });
        external.validate(function(err){
            expect(err.errors.company).to.exist;
            done();
        });
    });

    it('should be valid if pictureURL is empty', function(){
        let external = new External({
            name:"Georges Petrofski",
            email:"e-mail",
            hashedPassword:"imahacker"
        });

        external.validate(function(err){
            expect(err).to.not.exist;
        });
    });

    it('should be valid if all is complete', function(){
        let external = new External({
            name:"Georges Petrofski",
            pictureURL:"url",
            email:"e-mail",
            company: new Company({
                name: 'Craftworkz',
                contactPerson: new External({
                    name:"Georges Petrofski", pictureURL:"url", email:"e-mail", company:this
                }),
                location: new Location({
                    address:"Gaston Geenslaan 11 B4", postalCode:3000, country:"BEL"
                })
            })
        });

        external.save(function(err){
            expect(err).to.not.exist;
        });

        external.remove(function(err){
            expect(err).to.not.exist;
        });
        
        external.validate(function(err){
            expect(err).to.not.exist;
        });
    });
});