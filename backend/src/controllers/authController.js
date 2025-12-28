const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { successResponse, errorResponse } = require('../utils/response');

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
};

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return errorResponse(res, 'Email already registered', 400);
        }

        const user = await User.create({ name, email, password });

        const token = generateToken(user.id);

        return successResponse(
            res,
            {
                user: user.toJSON(),
                token,
            },
            'User registered successfully',
            201
        );
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return errorResponse(res, 'Invalid email or password', 401);
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return errorResponse(res, 'Invalid email or password', 401);
        }

        const token = generateToken(user.id);

        return successResponse(
            res,
            {
                user: user.toJSON(),
                token,
            },
            'Logged in successfully'
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
};
