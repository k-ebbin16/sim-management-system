import { useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  // Initialize auth state on component mount
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
        api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);

      const response = await api.post(
        "/Token/getToken",
        {
          email,
          password,
        },
        {
          _skipAuth: true,
        },
      );

      const data = response.data;

      if (!data.isSuccessful) {
        throw new Error(data.messages?.[0] || "Login failed");
      }

      const newToken = data.responseData?.token;

      if (!newToken) {
        throw new Error("Invalid token response from server");
      }

      // Update state and localStorage
      localStorage.setItem("token", newToken);
      setToken(newToken);

      // Update axios default headers
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

      return {
        isSuccessful: true,
        token: newToken,
        message: "Login successful",
      };
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      logout();
      return {
        isSuccessful: false,
        message:
          error.response?.data?.messages?.[0] ||
          error.message ||
          "Login failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem("token");

    // Clear local state
    setToken(null);

    // Clear axios default headers
    delete api.defaults.headers.common.Authorization;

    // Navigate to login page
    navigate("/login", { replace: true });
  };

  const value = {
    isAuthenticated,
    token,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
