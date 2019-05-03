const express = require('express');
const boardRouter = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Board = require('../models/board');

boardRouter.route('/')

  .get(function (req, res) {
    Board.find({}, function (err, result) {
      if (err) res.send(err);
      res.json(result);
    })
  })

  .post(function (req, res) {
    Board.findOne({title: req.body.title})
      .then( board => {
        if(board) {
          return res.status(400).json(errors);
        } else {
          const newBoard = new Board({
            title: req.body.title,
            list: req.body.list,
          });

      newBoard.save(function (err) {
        if (err) {
          return res.status(400).json(err);
        }
        res.json({success: true, message: 'Board added successfully'});
      })
      }
    })
  });

boardRouter.route('/:board_id')

  .get(function (req, res) {
    Board.findById(req.params.board_id, function (err, result) {
      if (err) res.send(err);
      res.json(result);
    })
  })

  .post(function (req, res) {
    Board.updateOne({_id: req.params.board_id},
      {$push: {list: req.body.list_id}},
      function(err){
        if (err) res.send(err);
        res.json({success: true, message: 'Board updated!'})
      });
  })

  .delete(function (req, res) {
    Board.deleteOne({ _id: req.params.board_id }, function (err) {
      if (err) return handleError(err);
      res.json({success: true, message: 'Board delete!'})
    });
  });

module.exports = boardRouter;


