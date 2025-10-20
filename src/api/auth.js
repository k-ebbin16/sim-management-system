import axios from "axios";

const API_BASE_URL = "https://portal.umat.edu.gh/simd/api";

async function getToken(email, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/Token/getToken`, {
      email: email,
      password: password,
    });

    const data = response.data;

    if (!data.isSuccessful) {
      throw new Error(data.messages?.[0] || "Invalid credentials 😩");
    }

    // store token
    localStorage.setItem("token", data.responseData?.token);

    console.log("Token received:", data.responseData?.token);
    return data.responseData?.token;
  } catch (error) {
    console.error("Token error:", error.response?.data || error.message);
    throw error;
  }
}

export default getToken;
