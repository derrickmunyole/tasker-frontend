import { post, get } from "./ApiClient";

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
      const response = await post('/user/login', { email, password }, {
          withCredentials: true 
      });
      
      console.log(response.data);
      
      if (response.data.success) {
         
          localStorage.setItem('session_id', response.data.session_id);
          
          return response;
      } else {
          throw new Error(response.data.message || 'Login failed');
      }
  } catch (error) {
      console.error('There was an error logging in', error);
      throw error;
  }
}

const getUserInfo = async () => {
  try {
    const response = await get('/user/info', {
      withCredentials: true
    });

    
    if (response?.status == 200) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch user info');
    }
  } catch (error) {
    console.error('There was an error fetching user info', error);
    throw error;
  }
};

export { registerUser, loginUser, getUserInfo };