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
  const [user, setUser] = useState(null); // Add user state

  const navigate = useNavigate();

  // Function to decode user from token
  const decodeUserFromToken = (token) => {
    if (!token) return null;

    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));

      return {
        id: decoded.uid,
        email:
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ],
        name: decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ],
        displayName:
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        roles:
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] || [],
        permissions: decoded.permission || [],
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    TokenManager.setNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    setIsAuthenticated(!!token);
    // Update user when token changes
    if (token) {
      setUser(decodeUserFromToken(token));
    } else {
      setUser(null);
    }
  }, [token]);

  // Initialize auth state on component mount
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (storedToken) {
        setToken(storedToken);
        setRefreshToken(storedRefreshToken);
        setUser(decodeUserFromToken(storedToken)); // Decode user
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
      setUser(decodeUserFromToken(newToken)); // Decode and set user

      // Update axios default headers
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

      return {
        isSuccessful: true,
        token: newToken,
        user: decodeUserFromToken(newToken), // Return user info
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
    user, // Include user in context value
    login,
    logout,
    refreshAuthToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
