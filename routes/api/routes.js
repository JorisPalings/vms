var express = require('express');
var router = express.Router();

var auth = require('./authentication');
var user = require('./user');

// Authentication
// 1. Login
router.post('/login', auth.login);

// 2. Register
router.post('/register', auth.register);

// User data
// 1. Get google calendars
router.post('/google-calendars', user.googlecalendars);

module.exports = router;
