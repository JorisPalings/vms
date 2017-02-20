var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../layouts/index.html'));
});

router.use(express.static(path.join(__dirname, 'client')));


module.exports = router;
