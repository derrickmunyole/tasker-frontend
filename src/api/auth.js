import apiClient from "./apiClient";
import { STATUS_CODES } from "../constants/statusCodes";

const registerUser = async (username, email, password) => {
  try {
    const response = await apiClient.post('/user/register', { username, email, password });
    console.log(response.data);
    return response
  } catch (error) {
    console.error('There was an error registering the user!', error);
  }
};


const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/user/login', { email, password });
    
    console.log(response.data);
    
    if (response.data.success) {
      
      localStorage.setItem('isLoggedIn', 'true');
      
      return response;
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    console.error('There was an error logging in', error);
    throw error;
  }
}


const logoutUser = async () => {
  try {
    const response = await apiClient.post('/user/logout');
    console.log(response.data);
    localStorage.removeItem('isLoggedIn');
    return response;
  } catch (error) {
    console.error('There was an error logging out', error);
    throw error;
  }
};


const getUserInfo = async () => {
  try {
    const response = await apiClient.get('/user/info')

    
    if (response?.status == STATUS_CODES.OK) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch user info');
    }
  } catch (error) {
    console.error('There was an error fetching user info', error);
    throw error;
  }
};


const getUserPreference = async () => {
  try {
      const response = await apiClient.get('/user/ui-preferences');

      if (response?.status == STATUS_CODES.OK) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch ui preference');
    }
  } catch (error) {
    console.error('There was an error ui preference ', error);
    throw error;
  }
}

export { registerUser, loginUser, logoutUser, getUserInfo, getUserPreference };