require('dotenv').config();
const app = require('./app');
const { syncDatabase } = require('./models');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await syncDatabase();

        app.listen(PORT, () => {
            console.log(`
╔════════════════════════════════════════════╗
║     Task Manager API Server Started        ║
╠════════════════════════════════════════════╣
║  🚀 Server running on port ${PORT}             ║
║  📍 http://localhost:${PORT}                   ║
║  💾 Database: SQLite                       ║
╚════════════════════════════════════════════╝
      `);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
