import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          return apiClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const sessionId = localStorage.getItem('session_id');

        if (!sessionId) {
          // Handle the case where sessionId is not in localStorage
          console.error('No session ID found in localStorage');
          // Redirect to login or handle this case appropriately
          window.location.href = '/login';
          return Promise.reject(new Error('No session ID found'));
        }
        
        const response = await apiClient.post('/user/refresh-token', { session_id: sessionId }, {
          headers: {'content-type':'application/json'}
        });
        
        if (response.data.success) {
          processQueue(null, response.data.accessToken);
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('session_id');
        // Clear other session data (Redux store, etc.)
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
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
