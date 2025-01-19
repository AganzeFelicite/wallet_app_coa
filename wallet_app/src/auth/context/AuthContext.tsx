// src/contexts/auth/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";

// Types
interface AuthContextType {
  authToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  user: UserType | null;
}

interface UserType {
  id: number;
  email: string;
  name?: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const response = await axios.post(`${BASE_URL}auth/jwt/refresh/`, {
          refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem("accessToken", access);
        originalRequest.headers["Authorization"] = `JWT ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout user
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  // Function to verify token validity
  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      await api.post(
        "/auth/jwt/verify/",
        {
          token: token,
        },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Token verification failed:", error.response?.data);
      }
      return false;
    }
  };

  // Function to fetch user details
  const fetchUserDetails = async (token: string) => {
    try {
      const response = await api.get("auth/users/me/", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  // Check for valid token on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedAuthToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (storedAuthToken && storedRefreshToken) {
        try {
          const isValid = await verifyToken(storedAuthToken);
          if (isValid) {
            setAuthToken(storedAuthToken);
            setRefreshToken(storedRefreshToken);
            setIsAuthenticated(true);
            await fetchUserDetails(storedAuthToken);
            return;
          } else {
            // Token invalid - clear everything
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setIsAuthenticated(false);
            setUser(null);
            return;
          }
        } catch (error) {
          console.error("Authentication initialization failed:", error);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post<AuthResponse>("auth/jwt/create/", {
        email,
        password,
      });

      console.log("Login Response:", response.data);
      const { access, refresh } = response.data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      setAuthToken(access);
      setRefreshToken(refresh);
      setIsAuthenticated(true);

      // Fetch user details after successful login
      await fetchUserDetails(access);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Rethrow to handle in the component
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuthToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        refreshToken,
        login,
        logout,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
