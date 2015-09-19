'use strict';

var express = require('express');
var router = express.Router();
var api = require('./routes.api');

router.get('/', function(req, res) {
  res.redirect('index.html');
});

router.use('/api', api);

// // redirect all others to the index (HTML5 history)
// router.get('*', function(req, res) {
//   res.redirect('index.html');
// });

module.exports = router;
