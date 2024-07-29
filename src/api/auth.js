import apiClient from "./ApiClient";

const registerUser = async (username, email, password) => {
  try {
    const response = await apiClient.post('api/user/register', { username, email, password });
    console.log(response.data);
    return response
  } catch (error) {
    console.error('There was an error registering the user!', error);
  }
};


const loginUser = async (email, password) => {
    try {
        const response = await apiClient.post('api/user/login', {username, password});
        console.log(response.data)
        return response
    } catch (error) {
        console.error('There was an error logging in', error);
    }
}

export default {registerUser,loginUser}