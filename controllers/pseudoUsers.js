'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    crypto = require('crypto'),
    mailer = require(path.join(__dirname, '..', 'mailer')),
    models = require(path.join(__dirname, '..', 'models')),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON')),
    handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError'));



// Post - to send verfication email and setup new Pseudo user if needed
router.post('/emailVerification', respondsToJSON, function(req, res, next) {
    var randomHash = crypto.randomBytes(4).toString('hex');

    if (!req.body.email || req.body.email.length < 3) {
        return handleError({
            message: 'Not a valid email address!',
            status: 400
        }, next);
    }

    models.pseudoUsers.findOrCreate({
            where: {
                email: req.body.email
            }
        })
        .spread(function(pUser, created) {

            if (created || !pUser.emailVerified) {

                //User was created or not verified
                pUser.update({
                    emailVerification: randomHash
                }).then(function(user) {
                    mailer.verifyEmailNoLink(req.body.email, randomHash, function(err) {
                        if (err) {
                            user.destroy({
                                force: true
                            });
                            return handleError(err, next);
                        }
                        return res.json({
                            pUserId: user.id
                        });
                    });
                }, function(err) {
                    return handleError(err, next);
                });

            } else {

              // User already verified - update form with the userID and email
                models.temporaryForms.findById(req.session.formId).then(function(form) {
                    form.update({
                        pseudoUserId: pUser.id,
                        email: pUser.email
                    }).catch(function(err) {
                        return handleError(err, next);
                    });
                });

                // res json that user verified
                res.json({
                    verified: true,
                    pUserId: pUser.id
                });
            }
        }).catch(function(err) {
            return handleError(err, next);
        });
});

// Put - to check verification code and confirm or respond with false
router.put('/emailVerification', respondsToJSON, function(req, res, next) {

    models.pseudoUsers.findById(req.body.userId).then(function(user) {
        if (user.emailVerification === req.body.verificationCode) {
            user.update({
                emailVerified: true
            }).then(function(user) {
                if (req.session.fomdId) {
                  console.log(user);
                    models.temporaryForms.findById(req.session.formId).then(function(form) {
                        form.update({
                            pseudoUserId: user.id,
                            email: user.email
                        }).catch(function(err) {
                            console.error(err);
                        });
                    });
                }
                return res.json({
                    verified: true
                });
            }, function(err) {
                return handleError(err, next);
            });
        } else {
            res.json({
                verified: false
            });
        }
    }, function(err) {
        return handleError(err, next);
    });
});

module.exports = router;
