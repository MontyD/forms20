'use strict';

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    morgan = require('morgan'),
    RateLimit = require('express-rate-limit'),
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

app.use(cookieParser());
app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3200000
    }
}));


// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
    function(reqUsername, password, done) {
        models.users.findOne({
            where: {
                'username': reqUsername
            },
            attributes: ['salt', 'password', 'id', 'firstName', 'admin']
        }).then(function(user) {
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect credentials.'
                });
            }
            bcrypt.hash(password, user.salt, function(err, hash) {
                if (err) {
                    done(null, false, err);
                }
                if (hash === user.password) {
                    return done(null, {id: user.id, username: reqUsername, firstName: user.firstName, admin: user.admin});
                }
                return done(null, false, {
                    message: 'Incorrect credentials.'
                });
            });
        });
    }
));


// Rate limit setup
var limiter = new RateLimit({
    windowMs: 10 * 60 * 1000,
    max: 20,
    delayMs: 0
});

app.use('/temporaryForms', limiter);


// Logging
if (config.env === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}


// Routing - in controllers
app.use(controllers);


// Error handling

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
if (config.env === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.error(err);
        if (/json/gi.test(req.get('accept'))) {
            res.json(err.message);
        } else {
            res.render('error', {
                message: err.message,
                error: err
            });
        }
    });
}

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err);
    if (/json/gi.test(req.get('accept'))) {
        res.json(err.message);
    } else {
        res.render('error', {
            message: err.message,
            error: {}
        });
    }
});


// Init - sync database and create default user if none exists
models.sequelize.sync().then(function() {
    models.users.count().then(function(count) {
        if (count === 0) {
            models.users.create({
                username: config.defaultUser.username,
                password: config.defaultUser.password,
                email: config.defaultUser.email,
                fullName: config.defaultUser.actualName,
                emailVerified: true,
                admin: true
            }).then(function(user) {
                console.log(user.username + ' created!');
            }).catch(function(err) {
                console.error(err);
            });
        }
        app.listen(port, function() {
            console.log('Listening on port ' + port);
        });
    }).catch(function(err) {
        console.error(err);
    });
});
