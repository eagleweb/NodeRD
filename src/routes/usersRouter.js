const express = require('express');
const usersRouter = express.Router();

usersRouter
  .route('/')

    .get(function(req, res) {
      res.send('Get all users');
    })

    .post(function(req, res) {
      res.send('Post user');
    });

usersRouter
  .route('/:userId')

    .get(function(req, res) {
      res.send('Get users by ID');
    })

    .put(function(req, res) {
      res.send('Put user by ID');
    })

    .delete(function(req, res) {
      res.send('Delete user by ID');
    });

module.exports = usersRouter;
