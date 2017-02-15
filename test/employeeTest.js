'use strict'

const expect = require('chai').expect;
const Employee = require('../models/persons');

describe('Employee', function(){
    it('should be invalid if name is empty', function(){
        let employee = new Employee({
            pictureURL:"url",
            email:"e-mail",
            hashedPassword:"imahacker"
        });
        employee.validate(function(err){
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it('should be invalid if email is empty', function(){
        let employee = new Employee({
            name:"Georges Petrofski",
            pictureURL:"url",
            hashedPassword:"imahacker"
        });
        employee.validate(function(err){
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid if hashedPassword is empty', function(){
        let employee = new Employee({
            name:"Georges Petrofski",
            pictureURL:"url",
            email:"e-mail",
        });
        employee.validate(function(err){
            expect(err.errors.hashedPassword).to.exist;
            done();
        });
    });

    it('should be valid if pictureURL is empty', function(){
        let employee = new Employee({
            name:"Georges Petrofski",
            email:"e-mail",
            hashedPassword:"imahacker"
        });

        employee.validate(function(err){
            expect(err).to.not.exist;
        });
    });

    it('should be valid if all is complete', function(){
        let employee = new Employee({
            name:"Georges Petrofski",
            pictureURL:"url",
            email:"e-mail",
            hashedPassword:"imahacker"
        });

        employee.save(function(err){
            expect(err).to.not.exist;
        });

        employee.remove(function(err){
            expect(err).to.not.exist;
        });
        
        employee.validate(function(err){
            expect(err).to.not.exist;
        });
    });
});