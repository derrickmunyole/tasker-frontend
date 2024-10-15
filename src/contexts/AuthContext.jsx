import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../api/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async (navigate) => {
      const timeoutDuration = 5000;
      let timeoutId;
  
      try {
        const authPromise = apiClient.get('/user/check-auth');
        
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => {
            reject(new Error('Authentication check timed out'));
          }, timeoutDuration);
        });
  
        const response = await Promise.race([authPromise, timeoutPromise]);
  
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          console.log('User is not authenticated');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
        if (navigate) {
          navigate('/login');
        }
      } finally {
        clearTimeout(timeoutId);
        setIsLoading(false);
      }
    };

  checkAuth();
}, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
