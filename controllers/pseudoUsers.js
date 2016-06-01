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
    var randomHash = crypto.randomBytes(20).toString('hex').substring(0, 6);
    models.pseudoUsers.create({
        email: req.body.email,
        emailVerification: randomHash
    }).then(function(user) {
        mailer.verifyEmailNoLink(req.body.email, randomHash, function(err) {
            if (err) {
                return handleError(err);
            }
            res.json({pUserId: user.id});
        });
    }, function(err) {
        handleError(err);
    });
});

module.exports = router;
