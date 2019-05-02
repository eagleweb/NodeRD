const express = require('express');
const wsRouter = express.Router();
const emitter = require('../EventEmitter');

wsRouter.ws('/:board_id', function(ws, req) {

  emitter.on('list', function() {
    console.log('The event was raised!');
  });

  ws.on('message', function(msg) {
    console.log(req.params.board_id);
  });

});

module.exports = wsRouter;
