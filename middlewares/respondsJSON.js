'use strict';

var path = require('path'),
    config = require(path.join('..', 'config.js'));

function respondsToJSON(req, res, next) {

    if (req.accepts('json') && req.headers['user-agent'] && config.host.test(req.get('origin'))) {
        next();
    } else {
        var err = new Error('Go away please');
        err.status = '403';
        next(err);
    }
}

module.exports = respondsToJSON;
