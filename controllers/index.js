'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    passUser = require(path.join(__dirname, '..', 'middlewares', 'passUser'));

router.use('/temporaryForms', require('./temporaryForms'));

router.use('/config', require('./globalConfig'));

router.use('/users', passUser, require('./users'));

router.use('/pseudoUsers', require('./pseudoUsers'));


// render index
router.get('/', passUser, function(req, res) {
  var session = !!(req.session.formId && req.session.formSaveRef);
    res.render('index', {sessionForm: session});
});

// render new create form page
router.get('/create', passUser, function(req, res) {
    res.redirect('/temporaryForms');
});

module.exports = router;
