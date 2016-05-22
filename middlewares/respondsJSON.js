'use strict';

function respondsToJSON(req, res, next) {
  if (req.accepts('json') && req.headers['user-agent'] && req.headers.requestfrom === 'angular') {
    next();
  } else {
    var err = new Error('Go away please');
    err.status = '403';
    next(err);
  }
}

module.exports = respondsToJSON;
