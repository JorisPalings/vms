var express = require('express');
var router = express.Router();

var auth = require('./authentication');

// Authentication
// 1. Login
router.post('/login', auth.login);

// 2. Register
router.post('/register', auth.register);

module.exports = router;
