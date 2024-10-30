import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

let isRefreshing = false;
let refreshSubscribers = [];

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

const onSessionRefreshed = (error) => {
  refreshSubscribers.forEach((callback) => callback(error));
  refreshSubscribers = [];
};

/**
 * Intercepts API responses to handle authentication errors and token refresh.
 * 
 * @param {Function} onFulfilled - Callback for successful responses.
 * @param {Function} onRejected - Callback for error responses.
 * @returns {Promise} A promise that resolves with the API response or rejects with an error.
 * 
 * @description
 * This interceptor handles 401 (Unauthorized) errors by attempting to refresh the session.
 * If a refresh is already in progress, it queues the original request to be retried after the refresh.
 * If the refresh is successful, it retries the original request.
 * If the refresh fails, it redirects to the login page.
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addRefreshSubscriber((err) => {
            if (err) {
              reject(err);
            } else {
              resolve(apiClient(originalRequest));
            }
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await apiClient.post('/user/refresh-session');

        if (response.data.success) {
          onSessionRefreshed(null);
          return apiClient(originalRequest);
        } else {
          throw new Error('Session refresh failed');
        }
      } catch (refreshError) {
        onSessionRefreshed(refreshError);
        // Redirect to login page or handle session expiration
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
