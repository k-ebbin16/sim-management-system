import { useState } from "react";
import api from "../../api/axios";
import UserProfileContext from "../UserProfileContext";

const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState([]);

  const getUserProfile = async () => {
    try {
      const response = await api.get("/Users/userProfile");
      const data = response.data;
      console.log("Got profile");
      

      if (!data.isSuccessful) {
        throw new Error(data.messages?.[0] || "Failed to fetch user profile");
      }

      setUserProfile(data.responseData);

      return {
        isSuccessful: data.IsSuccessful,
        responseData: data.responseData,
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

  return (
    <UserProfileContext.Provider
      value={{ getUserProfile, setUserProfile, userProfile }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;
