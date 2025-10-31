// src/context/providers/UserProfileProvider.js
import { useEffect, useState } from "react";
import api from "../../api/axios";
import UserProfileContext from "../UserProfileContext";
import useApiQueue from "../../hooks/useApiQueue";

const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [currentUserRoles, setCurrentUserRoles] = useState([]);
  const [userId, setUserId] = useState("");
  const { addToQueue } = useApiQueue();

  const getCurrentUserProfile = async () => {
    return addToQueue(async () => {
      try {
        const response = await api.get("/Users/userProfile");
        const data = response.data;

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
    });
  };

  const getCurrentUserRoles = async () => {
    return addToQueue(async () => {
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
    });
  };

  useEffect(() => {
    if (userId) {
      getCurrentUserRoles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
