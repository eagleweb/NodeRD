const express = require('express');
const taskRouter = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Task = require('../models/task');
const emitter = require('../EventEmitter');

const id = 's8dsf7ds6f87s5afa98s5f9';

taskRouter.route('/')

  .get(function (req, res) {
    Task.find({}, function (err, result) {
      if (err) res.send(err);
      res.json(result);
    })
  })

  .post(function (req, res) {
    Task.findOne({title: req.body.title})
      .then( task => {
        if(task) {
          return res.status(400).json(errors);
        } else {
          const newTask = new Task({
            title: req.body.title,
            order: req.body.order,
            description: req.body.description,
            assignee: req.body.assignee,
          });

          newTask.save(function (err) {
            if (err) {
              return res.status(400).json(err);
            }
            res.json({success: true, message: 'Task added successfully'});
          });

          emitter.emit('task add', id);
        }
      })
  });

taskRouter.route('/:task_id')

  .get(function (req, res) {
    Task.findById(req.params.task_id, function (err, result) {
      if (err) res.send(err);
      res.json(result);
    })
  })

  .post(function (req, res) {
    Task.updateOne({_id: req.params.task_id},
      {
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        assignee: req.body.assignee,
      },
      function(err){
        if (err) res.send(err);
        res.json({success: true, message: 'List updated!'})
      });
    emitter.emit('task update', id);
  })

  .delete(function (req, res) {
    Task.deleteOne({ _id: req.params.task_id }, function (err) {
      if (err) return handleError(err);
      res.json({success: true, message: 'Task delete!'})
    });
    emitter.emit('task remove', id);
  });

module.exports = taskRouter;

