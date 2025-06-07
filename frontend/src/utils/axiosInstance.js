import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Request interceptor to add token to headers if available
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if(error.response.status === 401) {
                // Redirect to login page
                window.location.href = '/login';
            } else if( error.response.status === 500) {
                // Handle forbidden access
                console.error('Server error. Please try again later.');
            }
        } else if (error.code === 'ECONNABORTED') {
            // Handle timeout error
            console.error('Request timed out. Please try again later.');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;