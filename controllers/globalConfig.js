'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    models = require(path.join(__dirname, '..', 'models')),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON')),
    handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError'));


// Get JSON of themes
router.get('/themes', respondsToJSON, function(req, res, next) {

    models.formTheme.findAll().then(function(themes) {

        res.json(themes);

    }, function(error) {

        handleError(error, next);

    });

});


module.exports = router;
