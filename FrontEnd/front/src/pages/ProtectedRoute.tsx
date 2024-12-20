import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth(); // Usa el contexto de autenticación

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
