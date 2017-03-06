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

// 5. Update the external data
router.post('/update-external', user.update_external);

// Meeting service
//1. Get all meetings for current user
router.post('/meetingsUser', meeting.getAllForOne);

//2. Get meeting
router.post('/meeting', meeting.getMeeting);

//3. Get externals
router.post('/externals', meeting.getExternals);

//4. Get all meetings
router.post('/meetings', meeting.getAll);

//5. Add a note to a meeting
router.post('/notes', meeting.saveNote);

//6. Get notes of meeting
router.post('/meeting/:id/notes', meeting.getNotes);

//7. Save note to meetingId
router.post('/meeting/save-note', meeting.saveNote);


// Project service
// 1. Get all projects
router.post('/projects', project.getAll);

// 2. Get meetings for project
router.post('/meetingsForProject', project.getMeetingsForProject);

// 3. Get notes of meetings of projects
router.post('/notesOfMeetingsFromProject', project.getNotesForMeetingForProject);

module.exports = router;
