'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    crypto = require('crypto'),
    models = require(path.join(__dirname, '..', 'models')),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON'));


// Get -- create new record (with random hash, and user agent), and echo back
router.get('/', respondsToJSON, function(req, res) {
    var randomHash = crypto.randomBytes(20).toString('hex');
    var temporaryForm = models.temporaryForms.create({
        user_agent: req.headers['user-agent'],
        hash: randomHash
    }).then(function(newForm) {
        res.json(newForm);
    }).catch(function(error) {
        console.log(error);
        res.status(500).send('crap!');
    });
});



module.exports = router;
