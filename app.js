'use strict';

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt-nodejs'),
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

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
        models.user.findOne({
            where: {
                'username': username
            }
        }).then(function(user) {
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect credentials.'
                });
            }

            var hashedPassword = bcrypt.hashSync(password, user.salt);

            if (user.password === hashedPassword) {
                return done(null, user);
            }

            return done(null, false, {
                message: 'Incorrect credentials.'
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    models.user.findById(user.id)
        .success(function(user) {
            done(null, user);
        }).error(function(err) {
            done(err, null);
        });
});

var limiter = new RateLimit({
    windowMs: 10 * 60 * 1000,
    max: 20,
    delayMs: 0
});

app.use('/temporaryForms', limiter);

if (config.env === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

app.use(controllers);


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

models.sequelize.sync().then(function() {
    app.listen(port, function() {
        console.log('Listening on port ' + port);
    });
});
