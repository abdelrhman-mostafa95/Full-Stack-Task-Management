const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { errorResponse } = require('../utils/response');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return errorResponse(res, 'Access denied. No token provided.', 401);
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return errorResponse(res, 'Access denied. No token provided.', 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);

        if (!user) {
            return errorResponse(res, 'User not found.', 401);
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return errorResponse(res, 'Invalid token.', 401);
        }
        if (error.name === 'TokenExpiredError') {
            return errorResponse(res, 'Token expired.', 401);
        }
        return errorResponse(res, 'Authentication failed.', 401);
    }
};

module.exports = auth;
