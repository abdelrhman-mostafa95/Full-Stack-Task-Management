import { useState } from 'react';
import './TaskCard.css';
import { FiClock, FiLoader, FiCheckCircle, FiTrash2, FiEdit2, FiX, FiCheck } from 'react-icons/fi';

const TaskCard = ({ task, onStatusChange, onDelete, onEdit, isUpdating = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description || '');

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

    const handleStartEdit = () => {
        setEditTitle(task.title);
        setEditDescription(task.description || '');
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditTitle(task.title);
        setEditDescription(task.description || '');
    };

    const handleSaveEdit = async () => {
        if (!editTitle.trim()) return;

        const success = await onEdit(task.id, {
            title: editTitle.trim(),
            description: editDescription.trim(),
        });

        if (success) {
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return (
            <div className={`task-card editing ${isUpdating ? 'updating' : ''}`}>
                <div className="edit-form">
                    <input
                        type="text"
                        className="edit-input"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Task title..."
                        disabled={isUpdating}
                    />
                    <textarea
                        className="edit-textarea"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Description (optional)..."
                        rows={3}
                        disabled={isUpdating}
                    />
                    <div className="edit-actions">
                        <button
                            className="edit-save-btn"
                            onClick={handleSaveEdit}
                            disabled={isUpdating || !editTitle.trim()}
                        >
                            <FiCheck /> Save
                        </button>
                        <button
                            className="edit-cancel-btn"
                            onClick={handleCancelEdit}
                            disabled={isUpdating}
                        >
                            <FiX /> Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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

                <div className="action-buttons">
                    <button
                        className="task-edit-btn"
                        onClick={handleStartEdit}
                        disabled={isUpdating}
                        aria-label="Edit task"
                    >
                        <FiEdit2 />
                    </button>
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
        </div>
    );
};

export default TaskCard;
