import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../api/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async (navigate) => {
    const timeoutDuration = 20000;
    let timeoutId;
    
    try {
      const authPromise = apiClient.get('/user/check-auth');
      
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error('Authentication check timed out'));
        }, timeoutDuration);
      });
  
      const response = await Promise.race([authPromise, timeoutPromise]);
      console.log(response)
      if (response.data.isAuthenticated) {
        setIsAuthenticated(true);
       
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('isLoggedIn');
        console.log('User is not authenticated');
        
        if (navigate) {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
      localStorage.removeItem('isLoggedIn');
      if (navigate) {
        navigate('/login');
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    checkAuth();
  }, []); 

  const logout = async (navigate) => {
    try {
      const response = await apiClient.post('/user/logout');
      console.log('Logout response:', response);

      if (response.statusText === 'OK') {
        console.log('Logout successful');
        setIsAuthenticated(false);
        localStorage.removeItem('isLoggedIn')

        navigate('/login');
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);

      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
