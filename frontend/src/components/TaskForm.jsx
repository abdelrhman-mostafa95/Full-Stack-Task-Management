import { useState } from 'react';
import './TaskForm.css';
import Button from './Button';
import { FiPlus } from 'react-icons/fi';

const TaskForm = ({ onSubmit, isLoading = false }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) {
            newErrors.title = 'Title is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const success = await onSubmit({
            title: title.trim(),
            description: description.trim(),
            status,
        });

        if (success) {
            setTitle('');
            setDescription('');
            setStatus('pending');
            setErrors({});
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Add New Task</h3>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="task-title" className="form-label">
                        Title <span className="required">*</span>
                    </label>
                    <input
                        id="task-title"
                        type="text"
                        className={`form-input ${errors.title ? 'input-error' : ''}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title..."
                        disabled={isLoading}
                    />
                    {errors.title && <span className="error-text">{errors.title}</span>}
                </div>

                <div className="form-group form-group-small">
                    <label htmlFor="task-status" className="form-label">
                        Status
                    </label>
                    <select
                        id="task-status"
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        disabled={isLoading}
                    >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="task-description" className="form-label">
                    Description
                </label>
                <textarea
                    id="task-description"
                    className="form-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description (optional)..."
                    rows={3}
                    disabled={isLoading}
                />
            </div>

            <Button type="submit" variant="primary" loading={isLoading}>
                <FiPlus /> Add Task
            </Button>
        </form>
    );
};

export default TaskForm;
