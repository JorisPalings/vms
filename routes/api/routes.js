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

// 3. Log out
router.post('/logout', auth.logout);

// User data
// 1. Get google calendars
router.post('/google-calendars', user.googlecalendars);

// 2. Link the calendars to a user
router.post('/link-calendars', user.linkcals);

// 3. Get all the user data
router.post('/user', user.user);

// Meeting service
//1. Get all meetings
router.post('/meetings', meeting.getAll);


module.exports = router;
