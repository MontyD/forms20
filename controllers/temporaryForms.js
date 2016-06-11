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

    // have to update the model to store the save reference
    // save reference created from primary key id + random hash, must be unique
    }).then(function(newForm) {
        var saveRef = newForm.id + randomHash;
        newForm.update({
            saveReference: saveRef
        }).then(function(form) {
            return res.json({
              saveReference: form.saveReference,
              formId: form.id
            });
        }).catch(function(err) {
            return handleError(err, next);
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

    if (!req.params.form || !req.body.hash || isNaN(req.params.form)) {
        return handleError({
            message: 'Inconsistent post data',
            status: 401
        }, next);
    }

    models.temporaryForms.findById(req.params.form).then(function(form) {
        if (form.hash !== req.body.hash) {
            return handleError({
                message: 'Inconsistent post data',
                status: 401
            }, next);
        }

        var data = {};
        var reqData = req.body.payload;
        if (reqData.fields) {
            data.fields = reqData.fields;
        }
        if (reqData.name) {
            data.name = reqData.name;
        }
        if (reqData.description) {
            data.description = reqData.description;
        }
        if (reqData.style) {
            data.style = reqData.style;
        }

        form.update(data).then(function(response) {
            res.send(response);
        }, function(error) {
            handleError(error, next);
        });

    }, function(error) {
        handleError(error, next);
    });
});



module.exports = router;
