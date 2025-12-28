const { Task } = require('../models');
const { successResponse, errorResponse, getPagination, paginatedResponse } = require('../utils/response');

const createTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;
        const userId = req.user.id;

        const task = await Task.create({
            title,
            description,
            status: status || 'pending',
            userId,
        });

        return successResponse(res, task, 'Task created successfully', 201);
    } catch (error) {
        next(error);
    }
};

const getTasks = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { page, limit } = req.query;
        const pagination = getPagination(page, limit);

        const { count, rows: tasks } = await Task.findAndCountAll({
            where: { userId },
            limit: pagination.limit,
            offset: pagination.offset,
            order: [['createdAt', 'DESC']],
        });

        return paginatedResponse(res, tasks, count, pagination, 'Tasks retrieved successfully');
    } catch (error) {
        next(error);
    }
};

const getTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const task = await Task.findOne({
            where: { id, userId },
        });

        if (!task) {
            return errorResponse(res, 'Task not found', 404);
        }

        return successResponse(res, task, 'Task retrieved successfully');
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { title, description, status } = req.body;

        const task = await Task.findOne({
            where: { id, userId },
        });

        if (!task) {
            return errorResponse(res, 'Task not found', 404);
        }

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (status !== undefined) task.status = status;

        await task.save();

        return successResponse(res, task, 'Task updated successfully');
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const task = await Task.findOne({
            where: { id, userId },
        });

        if (!task) {
            return errorResponse(res, 'Task not found', 404);
        }

        await task.destroy();

        return successResponse(res, null, 'Task deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
};
