const express = require('express');
const wsRouter = express.Router();

wsRouter.ws('/:board_id', function(ws, req) {

  ws.on('message', function(msg) {
    console.log(req.params.board_id);
  });

});

module.exports = wsRouter;
