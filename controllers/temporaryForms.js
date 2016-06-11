'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    crypto = require('crypto'),
    models = require(path.join(__dirname, '..', 'models')),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON')),
    handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError'));

router.get('/', respondsToJSON, function(req, res, next) {
    var temporaryForm = models.temporaryForms.create({
        originIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        originUserAgent: req.get('User-Agent')

    }).then(function(form) {
      req.session.formId = form.id;
      req.session.formSaveRef = form.saveReference;
        return res.render('createForm', {
            id: form.id,
            saveReference: form.saveReference
        });
    }).catch(function(error) {
        return handleError(error, next);
    });
});


// Get -- return json of single temp form, and echo back
router.get('/:form', respondsToJSON, function(req, res, next) {

    if (!req.params.form || !req.query.hash || isNaN(req.params.form)) {
        return handleError({
            message: 'Inconsistent post data',
            status: 400
        }, next);
    }

    models.temporaryForms.findById(req.params.form).then(function(form) {
        if (form.hash !== req.query.hash) {
            return handleError({
                message: 'Inconsistent post data',
                status: 400
            }, next);
        }

        res.json(form);

    }, function(error) {
        handleError(error, next);
    });

});


// Put - to update form
router.put('/', respondsToJSON, function(req, res, next) {

  console.log(req.session);

    if ( !req.body.form || (!req.body.saveReference && (!req.session.formId || !req.session.formSaveRef))) {
        return handleError({
            message: 'Inconsistent post data',
            status: 400
        }, next);
    }
    var formId = req.session.formId || req.body.saveReference.split('A')[0];
    var saveRef = req.session.formSaveRef || req.body.saveReference;

    models.temporaryForms.findById(formId).then(function(form) {
        if (form.saveReference !== saveRef) {
            return handleError({
                message: 'Inconsistent post data',
                status: 400
            }, next);
        }

        form.update(req.body.form).then(function(form) {
            res.sendStatus(200);
        }).catch(function(error) {
            return handleError(error, next);
        });

    }, function(error) {
        return handleError(error, next);
    });
});



module.exports = router;
