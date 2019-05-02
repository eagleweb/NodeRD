const express = require('express');
const taskRouter = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Task = require('../models/task');

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
          })
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

  .delete(function (req, res) {
    Task.deleteOne({ _id: req.params.task_id }, function (err) {
      if (err) return handleError(err);
      res.json({success: true, message: 'Task delete!'})
    });
  });

module.exports = taskRouter;

