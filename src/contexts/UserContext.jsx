import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserInfo } from '../api/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    } catch (error) {
      // Handle error (e.g., redirect to login page)
      console.error('Failed to fetch user info:', error);
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
