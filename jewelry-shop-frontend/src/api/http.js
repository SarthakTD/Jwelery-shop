// src/api/http.js
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE || 'http://localhost:8080';

const http = axios.create({
  baseURL
});

export default http;
