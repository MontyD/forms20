'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    crypto = require('crypto'),
    models = require(path.join(__dirname, '..', 'models')),
    mailer = require(path.join(__dirname, '..', 'mailer')),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON')),
    handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError'));


// Get -- form create page.
router.get('/', function(req, res, next) {

    // Clear Session, user wants a new form.
    // Redirect to same page to set session of new form.
    if (req.query.clearsession) {
        req.session.formId = null;
        req.session.formSaveRef = undefined;
        return res.redirect('/temporaryForms');

    // Find form from sessionID and load into form
    } else if (req.session.formId && req.session.formSaveRef) {

        models.temporaryForms.findById(req.session.formId).then(function(form) {
            if (form.saveReference !== req.session.formSaveRef) {
                req.session.formId = null;
                req.session.formSaveRef = undefined;
                return res.redirect('/temporaryForms');
            } else {
                return res.render('createForm');
            }
        });


    // Create new form and set id and save ref to session.
    } else {

        var temporaryForm = models.temporaryForms.create({}).then(function(form) {
            req.session.formId = form.id;
            req.session.formSaveRef = form.saveReference;
            return res.render('createForm');
        }).catch(function(error) {
            return handleError(error, next);
        });

    }
});


// Get -- return json of single temp form, and echo back
router.get('/:form', respondsToJSON, function(req, res, next) {

    // Ensure that formID and save ref are in session or params and query.
    if (!(req.params.form === 'sessionForm' && req.session.formId && req.session.formSaveRef) && (!req.query.saveReference || isNaN(req.params.form))) {
        return handleError({
            message: 'Bad get request',
            status: 400
        }, next);
    }

    var formId = isNaN(req.params.form) ? req.session.formId : req.params.form;
    var saveReference = isNaN(req.params.form) ? req.session.formSaveref : req.query.saveReference;

    models.temporaryForms.findById(formId).then(function(form) {
        if (form.saveReference !== saveReference) {
            return handleError({
                message: 'Bad get request',
                status: 400
            }, next);
        }

        return res.json(form);

    }, function(error) {
        return handleError(error, next);
    });
});


// Put - to update form
router.put('/', respondsToJSON, function(req, res, next) {

    if (!req.body.form || (!req.body.saveReference && (!req.session.formId || !req.session.formSaveRef))) {
        return handleError({
            message: 'Inconsistent post data',
            status: 400
        }, next);
    }
    var formId = req.session.formId || req.body.saveReference.split('A')[0];
    var saveRef = req.session.formSaveRef || req.body.saveReference;

    models.temporaryForms.findById(formId).then(function(form) {
        if (form.saveReference !== saveRef || !(form.email !== undefined || form.email === req.body.form.config.email)) {
            return handleError({
                message: 'Inconsistent post data',
                status: 400
            }, next);
        }
        var formData = req.body.form;
        var userInitiated = req.body.userInitiated;
        var needToSendSaveRef = false;
        if (form.config && form.config.verified) {
            formData.email = req.body.form.config.email;
        }
        if (!form.saveReferenceSent && userInitiated) {
            formData.saveReferenceSent = true;
            needToSendSaveRef = true;
        }
        form.update(formData).then(function(form) {
            res.json({
                saveReference: form.saveReference
            });
            if (needToSendSaveRef) {
                mailer.sendSaveReference(req.body.form.config.email, form.saveReference);
            }
        }).catch(function(error) {
            return handleError(error, next);
        });

    }, function(error) {
        return handleError(error, next);
    });
});



module.exports = router;
