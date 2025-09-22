// src/admin/utils/axiosAuth.js
import axios from 'axios';

const username = process.env.REACT_APP_ADMIN_USER || 'admin';
const password = process.env.REACT_APP_ADMIN_PASS || 'admin123';
const token = btoa(`${username}:${password}`);

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:8080',
  headers: { Authorization: `Basic ${token}` }
});

export default instance;
