'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    models = require(path.join(__dirname, '..', 'models')),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON')),
    handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError'));

// Get -- create new record (with random hash, and user agent), and echo back
router.get('/login', respondsToJSON, function(req, res, next) {

    res.render('login');


});


// Get -- return json of single temp form, and echo back
router.get('/', respondsToJSON, function(req, res, next) {



});


// Post - to update form
router.post('/register', function(req, res, next) {
    models.user.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    }).then(function(user) {
        res.send(user);
    }).catch(function(error) {
        handleError(error, next);
    });
});



module.exports = router;
