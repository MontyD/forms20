'use strict';

function respondsToJSON(req, res, next) {
  if (req.accepts('json') && req.headers['user-agent']) {
    next();
  } else {
    //TODO Error handling
    res.sendStatus(500);
  }
}


module.exports = respondsToJSON;
