'use strict';

var express = require('express');
var router = express.Router();
var User = require('./user');
var Board = require('./board');


router.get('/', function(req, res) {
  res.json({ message: 'This is the API!' });
});

router.route('/users')
  .post(function(req, res) {

    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;

    user.save(function(err) {

      if (err) res.send(err);

      res.json({
        message: 'User created!',
        name: user.name,
        emailAddress: user.email,
      });

    });

  })

  .get(function(req, res) {

    User.find(function(err, users) {

      if (err) res.send(err);

      res.json(users);

    });

  });

router.route('/boards')

  .post(function(req, res) {

    var board = new Board();
    board.name = req.body.name;

    board.save(function(err) {

      if (err) res.send(err);

      res.json({
        message: 'Board created!',
        name: board.name
      });

    });

  })

  .get(function(req, res) {

    Board.find(function(err, boards) {

      if (err) res.send(err);

      res.json(boards);

    });

  });

module.exports = router;
