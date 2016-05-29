'use strict';

function handleError(err, next) {
    console.error(err);
    var error;
    error = new Error(err.message);
    if (error.name = 'SequelizeValidationError') {
        error.status = 400;
    } else {
        error.status = err.status || 500;
    }
    next(error);
}

module.exports = handleError;
