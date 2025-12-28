import './Input.css';

const Input = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    error = '',
    required = false,
    className = '',
}) => {
    return (
        <div className={`input-group ${className}`}>
            {label && (
                <label htmlFor={id} className="input-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`input-field ${error ? 'input-error' : ''}`}
                required={required}
            />
            {error && <span className="error-text">{error}</span>}
        </div>
    );
};

export default Input;
