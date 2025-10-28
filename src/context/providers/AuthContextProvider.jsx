import { useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import api, { TokenManager } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refreshToken"),
  );
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    TokenManager.setNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    setIsAuthenticated(!!token);
    
  }, [token]);

  // Initialize auth state on component mount
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (storedToken) {
        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
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
      const newRefreshToken = data.responseData?.refreshToken;

      if (!newToken || !newRefreshToken) {
        throw new Error("Invalid token response from server");
      }

      // Update state and localStorage
      TokenManager.setTokens(newToken, newRefreshToken);
      setToken(newToken);
      setRefreshToken(newRefreshToken);

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

  const refreshAuthToken = async () => {
    try {
      const currentToken = TokenManager.getToken();
      const currentRefreshToken = TokenManager.getRefreshToken();

      if (!currentToken || !currentRefreshToken) {
        throw new Error("No tokens available for refresh");
      }

      const response = await api.post(
        "/Token/refreshToken",
        {
          token: currentToken,
          refreshToken: currentRefreshToken,
        },
        {
          _skipAuth: true, // Skip auth interceptor for refresh request
        },
      );

      const { token: newToken, refreshToken: newRefreshToken } =
        response.data.responseData;

      if (!newToken || !newRefreshToken) {
        throw new Error("Invalid token response");
      }

      // Update state and localStorage using TokenManager
      TokenManager.setTokens(newToken, newRefreshToken);
      setToken(newToken);
      setRefreshToken(newRefreshToken);

      // Update axios default headers
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

      console.log("Token refreshed successfully");
      return { success: true, token: newToken };
    } catch (error) {
      console.warn(
        "Token refresh failed:",
        error.response?.data || error.message,
      );
      logout(); // if refresh fails → logout user
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    // Clear tokens using TokenManager
    TokenManager.clearTokens();

    // Clear local state
    setToken(null);
    setRefreshToken(null);

    // Clear axios default headers
    delete api.defaults.headers.common.Authorization;

    // Navigate to login page
    navigate("/login", { replace: true });
  };

  const value = {
    isAuthenticated,
    token,
    refreshToken,
    isLoading,
    login,
    logout,
    refreshAuthToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
