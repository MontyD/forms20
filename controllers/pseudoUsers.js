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
router.post('/emailVerification', respondsToJSON, function(req, res, next) {
    var randomHash = crypto.randomBytes(4).toString('hex');
    models.pseudoUsers.create({
        email: req.body.email,
        emailVerification: randomHash
    }).then(function(user) {
        mailer.verifyEmailNoLink(req.body.email, randomHash, function(err) {
            if (err) {
                return handleError(err, next);
            }
            return res.json({
                pUserId: user.id
            });
        });
    }, function(err) {
        return handleError(err, next);
    });
});

// Put - to send check verification code and confirm or respond with no
router.put('/emailVerification', respondsToJSON, function(req, res, next) {

    models.pseudoUsers.findById(req.body.userId).then(function(user) {
        if (user.emailVerification === req.body.verificationCode) {
            user.update({
                emailVerified: true
            }).then(function(user) {
              return res.json({verified: true});
            }, function(err) {
              return handleError(err, next);
            })
        } else {
          res.json({verified: false});
        }
    }, function(err) {
        return handleError(err, next);
    });
});

module.exports = router;