// src/Api/api.js
import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:5000', // Or the base URL of your backend
});
A

export default Api;
