'use strict';

function passUser(req, res, next) {
    if (!req.user) {
        return next();
    }
    console.log(req.user);
    res.locals.user = req.user;
    next();
}

module.exports = passUser;
