import axios from "axios";

// Centralized axios client for the real estate backend.
// Use VITE_API_URL if provided; otherwise fall back to localhost.
// Keeping this file avoids changing UI logic while fixing fetch/baseURL issues.
const API = axios.create({
  baseURL: import.meta?.env?.VITE_API_URL || "http://localhost:5000",
  timeout: 30000,
});

export default API;
