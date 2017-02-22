var express = require('express');
var router = express.Router();
var path = require('path');


router.use(express.static(path.join(__dirname, '../client')));

router.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, '../layouts/index.html'));
});


module.exports = router;
