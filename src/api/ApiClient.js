import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // This is important for sending cookies with requests
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // The browser will automatically send the HTTPOnly cookie
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired access token (status 401)
    // and we haven't already tried to refresh the token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const response = await apiClient.post('/user/refresh-token', {headers: {'content-type':'application/json'}});
        
        // If the token refresh was successful, retry the original request
        if (response.data.success) {
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // If refreshing the token fails, redirect to login
        // You might want to dispatch an action to clear the user's session in your state management
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export const get = (url) => apiClient.get(url);
export const post = (url, data) => apiClient.post(url, data);
export const put = (url, data) => apiClient.put(url, data);
export const remove = (url) => apiClient.delete(url);

export default apiClient;
