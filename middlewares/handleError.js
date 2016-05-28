'use strict';

function handleError(err, next) {
    console.error(err);
    var error = new Error(err.message);
    error.status = err.status || 500;
    next(error);
}

module.exports = handleError;
