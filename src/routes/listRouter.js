const express = require('express');
const listRouter = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const List = require('../models/list');
const emitter = require('../EventEmitter');

const id = 's8dsf7ds6f87s5afa98s5f9';

listRouter.route('/')

  .get(function (req, res) {
    List.find({}, function (err, result) {
      if (err) res.send(err);
      res.json(result);
    })
  })

  .post(function (req, res) {
    List.findOne({title: req.body.title})
      .then( list => {
        if(list) {
          return res.status(400).json(errors);
        } else {
          const newList = new List({
            title: req.body.title,
            order: req.body.order,
            task: req.body.task,
          });

          newList.save(function (err) {
            if (err) {
              return res.status(400).json(err);
            }
            res.json({success: true, message: 'List added successfully'});
          });

          emitter.emit('list add', id);
        }
      })
  });

listRouter.route('/:list_id')

  .get(function (req, res) {
    List.findById(req.params.list_id, function (err, result) {
      if (err) res.send(err);
      res.json(result);
    })
  })

  .post(function (req, res) {
    List.updateOne({_id: req.params.list_id},
      {$push: {task: req.body.task_id}},
      function(err){
        if (err) res.send(err);
        res.json({success: true, message: 'List updated!'})
      });
    emitter.emit('list update', id);
  })

  .delete(function (req, res) {
    List.deleteOne({ _id: req.params.list_id }, function (err) {
      if (err) return handleError(err);
      res.json({success: true, message: 'List delete!'})
    });
    emitter.emit('list remove', id);
  });

module.exports = listRouter;
