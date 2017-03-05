var express = require('express');
var router = express.Router();

var auth = require('./authentication');
var user = require('./user');
var meeting = require('./meeting');
var project = require('./project');

// Authentication
// 1. Login
router.post('/login', auth.login);

// 2. Register
router.post('/register', auth.register);

// 3. Log out
router.post('/logout', auth.logout);

// 4. Update
router.post('/update', auth.update);

// 5. Delete account
router.post('/deleteAccount', auth.deleteAccount);

// 6. Get Integrations
router.post('/integrations', auth.integrations);

// User data
// 1. Get google calendars
router.post('/google-calendars', user.googlecalendars);

// 2. Link the calendars to a user
router.post('/link-calendars', user.linkcals);

// 3. Get user calendars
router.post('/calendars', user.calendars);

// 4. Get all the user data
router.post('/user', user.user);

// Meeting service
//1. Get all meetings
router.post('/meetings', meeting.getAll);

//2. Get meeting
router.post('/meeting', meeting.getMeeting);

//3. Get externals
router.post('/externals', meeting.getExternals);

// Project service
// 1. Get all projects
router.post('/projects', project.getAll);


module.exports = router;