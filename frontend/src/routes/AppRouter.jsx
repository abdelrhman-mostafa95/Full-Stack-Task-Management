import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Tasks from '../pages/Tasks';

const AppRouter = () => {
    const { isAuthenticated, isLoading } = useAuth();

    const PublicRoute = ({ children }) => {
        if (isLoading) return null;
        return isAuthenticated ? <Navigate to="/tasks" replace /> : children;
    };

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />

            <Route
                path="/tasks"
                element={
                    <ProtectedRoute>
                        <Tasks />
                    </ProtectedRoute>
                }
            />

            <Route path="/" element={<Navigate to="/tasks" replace />} />

            <Route path="*" element={<Navigate to="/tasks" replace />} />
        </Routes>
    );
};

export default AppRouter;
