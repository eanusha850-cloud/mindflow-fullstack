import axios from 'axios';

// 🚀 Create an axios instance with baseURL pointing to your Spring Boot API
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json", // default content type for JSON requests
  },
});

// 🔑 Add a request interceptor to automatically attach JWT token if it exists
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
