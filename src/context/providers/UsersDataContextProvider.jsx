import { useState } from "react";
import api from "../../api/axios";
import UsersDataContext from "../UsersDataContext";

const UserDataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await api.get("/Users/getUser");
      const data = response.data;

      if (!data.isSuccessful) {
        throw new Error(data.messages?.[0] || "Failed to fetch users");
      }

      setUsers(data.responseData);

      return {
        isSuccessful: data.isSuccessful,
        responseData: data.responseData,
        users: data.responseData,
      };
    } catch (error) {
      console.error(
        "Failed to fetch users:",
        error.response?.data || error.message,
      );

      return {
        isSuccessful: false,
        message:
          error.response?.data?.messages?.[0] ||
          error.message ||
          "Failed to fetch users",
      };
    }
  };

  return (
    <UsersDataContext.Provider value={{ getUsers, setUsers, users }}>
      {children}
    </UsersDataContext.Provider>
  );
};

export default UserDataProvider;
