import React, { createContext, useState, useEffect } from 'react';
import { login, register, logout } from '../../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const userLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await login(email, password);
      localStorage.setItem('user', JSON.stringify(response.data));
      setCurrentUser(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const userRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await register(username, email, password);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
    logout();
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    login: userLogin,
    register: userRegister,
    logout: userLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};