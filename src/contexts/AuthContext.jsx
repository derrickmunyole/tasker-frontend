import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../api/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiClient.get('/user/check-auth');
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error('Auth check failed', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
  
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
