'use strict';

var app = require('express')(),
    mailer = require('express-mailer'),
    path = require('path'),
    config = require(path.join(__dirname, '..', 'config.js'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

mailer.extend(app, config.email);

module.exports.verificationEmail = function(email, name, link) {
    app.mailer.send('verifyEmail', {
        to: email,
        subject: 'Verify your email address',
        firstName: name,
        verificationLink: link
    }, function(err) {
        if (err) {
            console.error(err);
        }
    });
};
