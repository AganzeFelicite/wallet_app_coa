// src/axiosInstance.ts

import axios from "axios";
import { useAuth } from "./auth/context/AuthContext";
import BASE_URL from "./config";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const { authToken } = useAuth();
    if (authToken) {
      config.headers["Authorization"] = `JWT ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry and refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, logout } = useAuth();
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (refreshToken) {
        try {
          const response = await axios.post(BASE_URL + "auth/jwt/refresh/", {
            refreshToken,
          });

          const { accessToken } = response.data;
          localStorage.setItem("accessToken", accessToken);
          originalRequest.headers["Authorization"] = `JWT ${accessToken}`;
          return axios(originalRequest);
        } catch (err) {
          logout();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
