import './TaskCard.css';
import { FiClock, FiLoader, FiCheckCircle, FiTrash2 } from 'react-icons/fi';

const TaskCard = ({ task, onStatusChange, onDelete, isUpdating = false }) => {
    const statusConfig = {
        pending: {
            label: 'Pending',
            icon: <FiClock />,
            className: 'status-pending',
        },
        in_progress: {
            label: 'In Progress',
            icon: <FiLoader />,
            className: 'status-progress',
        },
        done: {
            label: 'Done',
            icon: <FiCheckCircle />,
            className: 'status-done',
        },
    };

    const currentStatus = statusConfig[task.status] || statusConfig.pending;

    return (
        <div className={`task-card ${isUpdating ? 'updating' : ''}`}>
            <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <span className={`task-status ${currentStatus.className}`}>
                    {currentStatus.icon}
                    {currentStatus.label}
                </span>
            </div>

            {task.description && (
                <p className="task-description">{task.description}</p>
            )}

            <div className="task-actions">
                <select
                    className="status-select"
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                    disabled={isUpdating}
                >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <button
                    className="task-delete-btn"
                    onClick={() => onDelete(task.id)}
                    disabled={isUpdating}
                    aria-label="Delete task"
                >
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
