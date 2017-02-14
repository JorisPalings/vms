var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../layouts/landing.html'));
});

router.use(express.static(path.join(__dirname, '/../assets')));
router.use(express.static(path.join(__dirname, '/../templates')));

module.exports = router;