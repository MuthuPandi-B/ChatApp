// src/Api/api.js
import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:5000', // Or the base URL of your backend
});
Api.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
}, (error) => {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
});
    
}

export default Api;
