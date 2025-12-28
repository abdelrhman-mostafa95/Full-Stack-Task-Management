import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../api/axios';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Button from '../components/Button';
import { FiLogOut, FiRefreshCw, FiCheckSquare } from 'react-icons/fi';
import './Tasks.css';

const Tasks = () => {
    const { user, logout } = useAuth();

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalTasks, setTotalTasks] = useState(0);
    const itemsPerPage = 6;

    const [isCreating, setIsCreating] = useState(false);
    const [updatingTaskId, setUpdatingTaskId] = useState(null);

    const fetchTasks = useCallback(async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await getTasks(currentPage, itemsPerPage);

            if (response.success) {
                setTasks(response.data);
                setTotalPages(response.pagination.totalPages);
                setTotalTasks(response.pagination.totalItems);
            }
        } catch (err) {
            setError('Failed to load tasks. Please try again.');
            console.error('Error fetching tasks:', err);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleCreateTask = async (taskData) => {
        setIsCreating(true);
        setError('');

        try {
            const response = await createTask(
                taskData.title,
                taskData.description,
                taskData.status
            );

            if (response.success) {
                await fetchTasks();
                return true;
            }
        } catch (err) {
            setError('Failed to create task. Please try again.');
            console.error('Error creating task:', err);
        } finally {
            setIsCreating(false);
        }

        return false;
    };

    const handleStatusChange = async (taskId, newStatus) => {
        setUpdatingTaskId(taskId);
        setError('');

        try {
            const response = await updateTask(taskId, { status: newStatus });

            if (response.success) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId ? { ...task, status: newStatus } : task
                    )
                );
            }
        } catch (err) {
            setError('Failed to update task. Please try again.');
            console.error('Error updating task:', err);
        } finally {
            setUpdatingTaskId(null);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        setUpdatingTaskId(taskId);
        setError('');

        try {
            const response = await deleteTask(taskId);

            if (response.success) {
                await fetchTasks();
            }
        } catch (err) {
            setError('Failed to delete task. Please try again.');
            console.error('Error deleting task:', err);
        } finally {
            setUpdatingTaskId(null);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="tasks-container">
            <header className="tasks-header">
                <div className="header-left">
                    <FiCheckSquare className="header-icon" />
                    <div>
                        <h1 className="header-title">Task Manager</h1>
                        <p className="header-subtitle">Welcome, {user?.name || 'User'}</p>
                    </div>
                </div>
                <div className="header-actions">
                    <Button variant="secondary" onClick={fetchTasks} disabled={isLoading}>
                        <FiRefreshCw className={isLoading ? 'spin' : ''} />
                        Refresh
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        <FiLogOut />
                        Logout
                    </Button>
                </div>
            </header>

            <main className="tasks-main">
                <TaskForm onSubmit={handleCreateTask} isLoading={isCreating} />

                <ErrorMessage message={error} onDismiss={() => setError('')} />

                <section className="tasks-section">
                    <div className="section-header">
                        <h2 className="section-title">Your Tasks</h2>
                        <span className="task-count">{totalTasks} total</span>
                    </div>

                    {isLoading ? (
                        <Loading message="Loading tasks..." />
                    ) : tasks.length === 0 ? (
                        <div className="empty-state">
                            <FiCheckSquare className="empty-icon" />
                            <h3>No tasks yet</h3>
                            <p>Create your first task using the form above</p>
                        </div>
                    ) : (
                        <>
                            <div className="tasks-grid">
                                {tasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        onStatusChange={handleStatusChange}
                                        onDelete={handleDeleteTask}
                                        isUpdating={updatingTaskId === task.id}
                                    />
                                ))}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Tasks;
