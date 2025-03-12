// src/context/AuthContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the AuthContext   
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from localStorage on app initialization
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    // Function to update user details globally
    const updateUser = (updatedUserData) => {
        setUser(updatedUserData);
        localStorage.setItem('user', JSON.stringify(updatedUserData)); // Update localStorage as well
    };

    // Logout function to remove user and token
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };


    return <AuthContext.Provider value={{ user, logout, updateUser }}>{children}</AuthContext.Provider>;
};
