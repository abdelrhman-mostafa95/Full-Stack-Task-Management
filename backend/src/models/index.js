const sequelize = require('../config/database');
const User = require('./User');
const Task = require('./Task');

User.hasMany(Task, {
    foreignKey: 'userId',
    as: 'tasks',
    onDelete: 'CASCADE',
});

Task.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

const syncDatabase = async (force = false) => {
    try {
        await sequelize.sync({ force });
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
        throw error;
    }
};

module.exports = {
    sequelize,
    User,
    Task,
    syncDatabase,
};
