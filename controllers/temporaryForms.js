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

    var randomHash = crypto.randomBytes(20).toString('hex');

    var temporaryForm = models.temporaryForms.create({
        user_agent: req.headers['user-agent'],
        hash: randomHash
    }).then(function(newForm) {
        res.json(newForm);
    }).catch(function(error) {
        handleError(error, next);
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

    });

});


// Post - to update form
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
          console.log(response);
          res.send(response);
        }, function(error) {
            handleError(error, next);
        });

    }, function(error) {
        handleError(error, next);
    });
});



module.exports = router;
