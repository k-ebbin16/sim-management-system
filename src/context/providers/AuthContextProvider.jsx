import { useEffect, useState } from "react";

import AuthContext from "../AuthContext";
import api from "../../api/axios";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refreshToken"),
  );

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await api.post("/Token/getToken", {
        email,
        password,
      });

      const data = response.data;

      if (!data.isSuccessful) {
        throw new Error(data.messages?.[0]);
      }

      localStorage.setItem("token", data.responseData?.token);
      localStorage.setItem("refreshToken", data.responseData?.refreshToken);

      setToken(() => localStorage.getItem("token"));
      setToken(() => localStorage.getItem("refreshToken"));

      return { isSuccessful: data.isSuccessful, token: token };
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);

      return {
        isSuccessful: error.response?.data.isSuccessful,
        message: error.response?.data.messages[0],
      };
    }
  };

  const refreshAuthToken = async () => {
    try {
      const response = await api.post("/api/Token/refreshToken", {
        token,
        refreshToken,
      });

      const { token: newToken, refreshToken: newRefreshToken } =
        response.data.responseData;

      localStorage.setItem("token", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      setToken(() => localStorage.getItem("token"));
      setToken(() => localStorage.getItem("refreshToken"));
      console.log("Token refreshed");
    } catch (error) {
      console.warn("Token refresh failed:", error.response?.data);
      logout(); // if refresh fails → logout user
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setToken("");
    setRefreshToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        refreshToken,
        isAuthenticated,
        login,
        logout,
        refreshAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
