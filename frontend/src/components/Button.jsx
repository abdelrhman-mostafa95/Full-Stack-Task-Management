import './Button.css';

const Button = ({
    type = 'button',
    variant = 'primary',
    loading = false,
    disabled = false,
    onClick,
    children,
    className = '',
}) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? (
                <span className="btn-loading">
                    <span className="spinner"></span>
                    Loading...
                </span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
