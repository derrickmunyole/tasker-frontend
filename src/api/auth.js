import { post } from "./ApiClient";

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
         
          localStorage.setItem('sessionId', response.data.session_id);
          
          return response;
      } else {
          throw new Error(response.data.message || 'Login failed');
      }
  } catch (error) {
      console.error('There was an error logging in', error);
      throw error;
  }
}

export { registerUser, loginUser };