const { errorResponse } = require('../utils/response');

const validate = (schema) => {
    return (req, res, next) => {
        const errors = [];

        for (const field in schema) {
            const rules = schema[field];
            const value = req.body[field];

            if (rules.required && (value === undefined || value === null || value === '')) {
                errors.push({ field, message: `${field} is required` });
                continue;
            }

            if (!rules.required && (value === undefined || value === null || value === '')) {
                continue;
            }

            if (rules.type === 'string' && typeof value !== 'string') {
                errors.push({ field, message: `${field} must be a string` });
            }

            if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
                errors.push({ field, message: `${field} must be at least ${rules.minLength} characters` });
            }

            if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
                errors.push({ field, message: `${field} must be at most ${rules.maxLength} characters` });
            }

            if (rules.isEmail && typeof value === 'string') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errors.push({ field, message: 'Please provide a valid email' });
                }
            }

            if (rules.enum && !rules.enum.includes(value)) {
                errors.push({ field, message: `${field} must be one of: ${rules.enum.join(', ')}` });
            }
        }

        if (errors.length > 0) {
            return errorResponse(res, 'Validation failed', 400, errors);
        }

        next();
    };
};

const schemas = {
    register: {
        name: { required: true, type: 'string', minLength: 2, maxLength: 100 },
        email: { required: true, type: 'string', isEmail: true },
        password: { required: true, type: 'string', minLength: 6 },
    },
    login: {
        email: { required: true, type: 'string', isEmail: true },
        password: { required: true, type: 'string' },
    },
    createTask: {
        title: { required: true, type: 'string', minLength: 1, maxLength: 255 },
        description: { required: false, type: 'string' },
        status: { required: false, enum: ['pending', 'in_progress', 'done'] },
    },
    updateTask: {
        title: { required: false, type: 'string', minLength: 1, maxLength: 255 },
        description: { required: false, type: 'string' },
        status: { required: false, enum: ['pending', 'in_progress', 'done'] },
    },
};

module.exports = {
    validate,
    schemas,
};
