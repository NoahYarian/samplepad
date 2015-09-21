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

    board.save(function(err, newBoard) {

      if (err) res.send(err);

      res.json({
        message: 'Board created!',
        board_id: newBoard._id
      });

    });

  })

  .get(function(req, res) {

    Board.find(function(err, boards) {

      if (err) res.send(err);

      res.json(boards);

    });

  });

router.route('/boards/:board_id')

  .get(function(req, res) {

    Board.findById(req.params.board_id, function(err, board) {

      if (err) res.send(err);

      res.json(board);

    });

  })

  .put(function(req, res) {

    Board.findById(req.params.board_id, function(err, board) {

      if (err) res.send(err);

      board.name = req.body.name;
      board.pads = req.body.pads;

      board.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'Board updated!' });
      });

    });
  })

  .delete(function(req, res) {

    Board.remove({
      _id: req.params.board_id
    }, function(err, board) {
      if (err) res.send(err);
      res.json({ message: 'Board deleted' });
    });

  });

module.exports = router;
