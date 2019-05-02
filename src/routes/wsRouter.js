const express = require('express');
const wsRouter = express.Router();
const emitter = require('../EventEmitter');

wsRouter.ws('/:board_id', function(ws, req) {

  const board_id = req.params.board_id;

  emitter.on('list add', function(id) {
    if (board_id === id) {
      ws.send('List added');
    }
  });

  emitter.on('list remove', function(id) {
    if (board_id === id) {
      ws.send('List remove');
    }
  });

  emitter.on('list update', function(id) {
    if (board_id === id) {
      ws.send('List updated');
    }
  });

  emitter.on('task add', function(id) {
    if (board_id === id) {
      ws.send('Task added');
    }
  });

  emitter.on('task remove', function(id) {
    if (board_id === id) {
      ws.send('Task remove');
    }
  });

  emitter.on('task update', function() {
    if (board_id === id) {
      ws.send('Task updated');
    }
  });
});

module.exports = wsRouter;
