import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Load user profile on initial app load if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/profile');
          setUser(res.data.data);
        } catch (err) {
          console.error('Failed to authenticate stored token:', err);
          logout();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token: receivedToken, ...userData } = res.data.data;
    
    localStorage.setItem('token', receivedToken);
    localStorage.setItem('user', JSON.stringify(userData));
    
    setToken(receivedToken);
    setUser(userData);
    return res.data;
  };

  const register = async (userData) => {
    const res = await api.post('/auth/register', userData);
    const { token: receivedToken, ...registeredData } = res.data.data;

    localStorage.setItem('token', receivedToken);
    localStorage.setItem('user', JSON.stringify(registeredData));

    setToken(receivedToken);
    setUser(registeredData);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
