'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    crypto = require('crypto'),
    models = require(path.join(__dirname, '..', 'models')),
    respondsToJSON = require(path.join(__dirname, '..', 'middlewares', 'respondsJSON')),
    handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError'));

// Get -- create new record (with random hash, and user agent), and echo back
router.post('/', respondsToJSON, function(req, res, next) {

    if (!req.body.form || !req.body.userId) {
        return handleError({
            message: 'You done messed up!',
            status: 400
        });
    }

    var randomHash = crypto.randomBytes(3).toString('hex');

    var temporaryForm = models.temporaryForms.create({
        name: req.body.form.name || '',
        description: req.body.form.description || '',
        email: req.body.form.config.email || '',
        fields: req.body.form.fields || {},
        config: req.body.form.config || {},
        pseudoUserId: req.body.userId,
        style: req.body.form.style

    }).then(function(form) {
        return res.json({
            saveReference: form.saveReference,
            formId: form.id
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
            status: 401
        }, next);
    }

    models.temporaryForms.findById(req.params.form).then(function(form) {
        if (form.hash !== req.query.hash) {
            return handleError({
                message: 'Inconsistent post data',
                status: 401
            }, next);
        }

        res.json(form);

    }, function(error) {
        handleError(error, next);
    });

});


// Put - to update form
router.put('/:form', respondsToJSON, function(req, res, next) {

    if (!req.params.form || !req.body.saveReference || isNaN(req.params.form) || !req.body.form) {
        return handleError({
            message: 'Inconsistent post data',
            status: 401
        }, next);
    }

    models.temporaryForms.findById(req.params.form).then(function(form) {
        if (form.saveReference !== req.body.saveReference) {
            return handleError({
                message: 'Inconsistent post data',
                status: 401
            }, next);
        }

        form.update(req.body.form).then(function(form) {
            res.json({
                formId: form.id,
                saveReference: form.config.saveReference
            });
        }).catch(function(error) {
            return handleError(error, next);
        });

    }, function(error) {
        returnhandleError(error, next);
    });
});



module.exports = router;
