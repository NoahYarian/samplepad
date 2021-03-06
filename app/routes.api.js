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
        message: 'Board ' + newBoard._id + ' created',
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
      board.updated = Date();

      board.save(function(err) {
        if (err) res.send(err);
        Board.find(function(err2, boards) {
          if (err2) res.send(err2);
          res.json({
            message: 'Board ' + board._id + ' saved',
            boards: boards
           });
        });
      });

    });
  })

  .delete(function(req, res) {

    Board.remove({
      _id: req.params.board_id
    }, function(err, board) {
      if (err) res.send(err);
      Board.find(function(err2, boards) {
        if (err2) res.send(err2);
        res.json({
          message: 'Board ' + req.params.board_id + ' deleted',
          boards: boards
         });
      });
    });

  });

module.exports = router;
