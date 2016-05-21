'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    models = require(path.join(__dirname, '..', 'models')),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON'));


// Get -- create new record, and echo back
router.get('/', respondsToJSON, function(req, res) {
    var temporaryForm = models.temporaryForms.create({user_agent: req.headers['user-agent']}).then(function(newForm) {
      res.json(newForm);
    });
});



module.exports = router;
