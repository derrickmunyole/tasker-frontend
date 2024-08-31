import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserInfo } from '../api/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // In your UserContext.js
  const fetchUser = async () => {
    try {
      console.log('Attempting to fetch user info...');
      const userInfo = await getUserInfo();
      console.log('User info fetched successfully:', userInfo);
      setUser(userInfo);
    } catch (error) {
      console.error('Error fetching user info:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      // Instead of retrying immediately, we'll set an error state
      setError('Failed to fetch user info');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, refetchUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
