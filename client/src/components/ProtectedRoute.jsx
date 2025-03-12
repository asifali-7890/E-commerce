import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Check if 'user' exists in localStorage (indicating authentication)
    const isAuthenticated = localStorage.getItem('user');

    // If user is not authenticated, redirect to /signup
    return isAuthenticated ? <Outlet /> : <Navigate to="/signup" />;
};

export default ProtectedRoute;
