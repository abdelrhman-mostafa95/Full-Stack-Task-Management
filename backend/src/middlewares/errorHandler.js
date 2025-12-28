const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map((e) => ({
            field: e.path,
            message: e.message,
        }));
        return errorResponse(res, 'Validation failed', 400, errors);
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        const errors = err.errors.map((e) => ({
            field: e.path,
            message: e.message,
        }));
        return errorResponse(res, 'Duplicate field value', 400, errors);
    }

    if (err.name === 'JsonWebTokenError') {
        return errorResponse(res, 'Invalid token', 401);
    }

    if (err.name === 'TokenExpiredError') {
        return errorResponse(res, 'Token expired', 401);
    }

    if (err.statusCode) {
        return errorResponse(res, err.message, err.statusCode);
    }

    return errorResponse(
        res,
        process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message || 'Internal server error',
        500
    );
};

module.exports = errorHandler;
