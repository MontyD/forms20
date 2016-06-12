'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    crypto = require('crypto'),
    models = require(path.join(__dirname, '..', 'models')),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON')),
    handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError'));

router.get('/', function(req, res, next) {

    if (req.query.clearsession) {
        req.session.formId = null;
        req.session.formSaveRef = undefined;
        return res.redirect('/temporaryForms');
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

    } else {
        var temporaryForm = models.temporaryForms.create({
            originIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            originUserAgent: req.get('User-Agent')
        }).then(function(form) {
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

    if (!(req.params.form === 'sessionForm' && req.session.formId && req.session.formSaveRef) && (!req.params.form || !req.query.saveReference || isNaN(req.params.form))) {
        return handleError({
            message: 'Bad get request',
            status: 400
        }, next);
    }

    var formId = req.params.form;
    var saveReference = req.query.saveReference;

    if (req.params.form === 'sessionForm') {
      formId = req.session.formId;
      saveReference = req.session.formSaveRef;
    }

    models.temporaryForms.findById(formId).then(function(form) {
        if (form.saveReference !== saveReference) {
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
        if (req.body.form.config.verified) {
          formData.email = req.body.form.config.email;
        }
        form.update(formData).then(function(form) {
            res.json({saveReference: form.saveReference});
        }).catch(function(error) {
            return handleError(error, next);
        });

    }, function(error) {
        return handleError(error, next);
    });
});



module.exports = router;
