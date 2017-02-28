var express = require('express');
var router = express.Router();

var auth = require('./authentication');
var user = require('./user');
var meeting = require('./meeting');

// Authentication
// 1. Login
router.post('/login', auth.login);

// 2. Register
router.post('/register', auth.register);

// User data
// 1. Get google calendars
router.post('/google-calendars', user.googlecalendars);

// Meeting service
//1. Get all meetings
router.post('/meetings', meeting.getAll);

module.exports = router;
