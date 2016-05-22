'use strict';

var express = require('express'),
    router = express.Router();

router.use('/temporaryForms', require('./temporaryForms'));

router.get('/', function(req, res) {
    res.render('index');
});

// render index
router.get('/', function(req, res) {
    res.render('index');
});

// render new create form page
router.get('/create', function(req, res) {
    res.render('createForm');
});

module.exports = router;
