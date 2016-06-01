'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    crypto = require('crypto'),
    mailer = require(path.join(__dirname, '..', 'mailer')),
    models = require(path.join(__dirname, '..', 'models')),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON')),
    handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError'));



// Post - to send verfication email and setup new Pseudo user
router.post('/emailVerification', respondsToJSON, function(req, res) {

});
