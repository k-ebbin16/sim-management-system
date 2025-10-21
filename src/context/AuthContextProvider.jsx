import { useEffect, useState } from "react";

import AuthContext from "./AuthContext";
import api from "../api/axios";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

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
      setToken(() => localStorage.getItem("token"));

      return { isSuccessful: data.isSuccessful, token: token };
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);

      return {
        isSuccessful: error.response?.data.isSuccessful,
        message: error.response?.data.messages[0],
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
