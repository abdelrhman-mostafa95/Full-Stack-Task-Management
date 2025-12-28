import './ErrorMessage.css';
import { FiAlertCircle, FiX } from 'react-icons/fi';

const ErrorMessage = ({ message, onDismiss }) => {
    if (!message) return null;

    return (
        <div className="error-message">
            <FiAlertCircle className="error-icon" />
            <span className="error-text">{message}</span>
            {onDismiss && (
                <button className="error-dismiss" onClick={onDismiss} aria-label="Dismiss error">
                    <FiX />
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
