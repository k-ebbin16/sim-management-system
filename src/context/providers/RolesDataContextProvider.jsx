import { useState } from "react";
import api from "../../api/axios";
import RolesDataContext from "../RolesDataContext";

const RolesDataProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    try {
      const response = await api.get("/Roles");
      const data = response.data;

      if (!data.isSuccessful) {
        throw new Error(data.messages?.[0] || "Failed to fetch roles");
      }

      setRoles(data.responseData);

      return {
        isSuccessful: data.isSuccessful,
        responseData: data.responseData,
        roles: data.responseData,
      };
    } catch (error) {
      console.error(
        "Failed to fetch roles:",
        error.response?.data || error.message,
      );

      return {
        isSuccessful: false,
        message:
          error.response?.data?.messages?.[0] ||
          error.message ||
          "Failed to fetch roles",
      };
    }
  };

  return (
    <RolesDataContext.Provider value={{ getRoles, setRoles, roles }}>
      {children}
    </RolesDataContext.Provider>
  );
};

export default RolesDataProvider;
