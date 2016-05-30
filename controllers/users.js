'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    passport = require('passport'),
    models = require(path.join(__dirname, '..', 'models')),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON')),
    handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError'));

// Get -- create new record (with random hash, and user agent), and echo back
router.get('/login', respondsToJSON, function(req, res, next) {

    res.send('login');

});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}), function(req, res, next) {
  res.send(req.user);
});


router.get('/register', function(req, res, next) {

  res.render('register');

});

// Post - creates new user
router.post('/register', function(req, res, next) {
    if (req.body.password !== req.body.passwordConfirmation) {
        return handleError({
            status: 400,
            message: 'Password not successfully confirmed'
        }, next);
    }
    models.users.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    }).then(function(user) {
        res.redirect('/users/login');
    }).catch(function(error) {
        handleError(error, next);
    });
});



module.exports = router;
