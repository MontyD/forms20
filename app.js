'use strict';

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    rateLimit = require('express-rate-limit'),
    port = process.env.PORT || 3000,
    path = require('path'),
    controllers = require(path.join(__dirname, 'controllers')),
    models = require(path.join(__dirname, 'models')),
    config = require(path.join(__dirname, 'config.js'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

var limiter = new rateLimit({
  windowMs: 10*60*1000,
  max: 100,
  delayMs: 0
});

app.use(limiter);

if (config.environment === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use(controllers);

models.sequelize.sync().then(function () {
  app.listen(port, function() {
      console.log('Listening on port ' + port);
  });
});
