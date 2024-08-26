// src/context/UserAuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserAuthContext = createContext();

const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      // Validate token or fetch user data here if needed
    }
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  // Check if the user is authenticated
  const isAuthenticated = () => !!token;

  return (
    <UserAuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export { UserAuthContext, UserAuthProvider };
