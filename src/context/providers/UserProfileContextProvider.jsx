import { useEffect, useState } from "react";
import api from "../../api/axios";
import UserProfileContext from "../UserProfileContext";

const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [currentUserRoles, setCurrentUserRoles] = useState([]);
  const [userId, setUserId] = useState("");

  const getCurrentUserProfile = async () => {
    try {
      const response = await api.get("/Users/userProfile");
      const data = response.data;
      // console.log("Got profile");

      if (!data.isSuccessful)
        throw new Error(data.messages?.[0] || "Failed to fetch user profile");

      setUserProfile(data.responseData);
      setUserId(data.responseData.id);

      return {
        isSuccessful: data.isSuccessful,
      };
    } catch (error) {
      console.error(
        "Failed to fetch userProfile:",
        error.response?.data || error.message,
      );

      return {
        isSuccessful: false,
        message:
          error.response?.data?.messages?.[0] ||
          error.message ||
          "Failed to fetch userProfile",
      };
    }
  };

  const getCurrentUserRoles = async () => {
    try {
      const response = await api.get(`/Users/roles/${userId}`);
      const data = response.data;

      if (!data.isSuccessful)
        throw new Error(
          data.messages?.[0] || "Failed to fetch current user roles",
        );

      setCurrentUserRoles(data.responseData);
      return {
        isSuccessful: data.isSuccessful,
      };
    } catch (error) {
      console.error(
        "Failed to fetch current User Roles:",
        error.response?.data || error.message,
      );

      return {
        isSuccessful: false,
        message:
          error.response?.data?.messages?.[0] ||
          error.message ||
          "Failed to fetch current User Roles",
      };
    }
  };

  useEffect(() => {
    if (userId) {
      getCurrentUserRoles();
    }
  }, [userId]);

  return (
    <UserProfileContext.Provider
      value={{
        getCurrentUserProfile,
        setUserProfile,
        setCurrentUserRoles,
        userProfile,
        currentUserRoles,
        userId,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;
