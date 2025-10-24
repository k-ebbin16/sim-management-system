import axios from "axios";

const API_BASE_URL = "https://portal.umat.edu.gh/simd/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Token management utilities
const TokenManager = {
  getToken: () => localStorage.getItem("token"),
  getRefreshToken: () => localStorage.getItem("refreshToken"),
  setTokens: (token, refreshToken) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
  },
  clearTokens: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },
  navigate: null,
  setNavigate: (navigateFunction) => {
    TokenManager.navigate = navigateFunction;
  },
  redirectToLogin: () => {
    TokenManager.clearTokens();
    if (TokenManager.navigate) {
      TokenManager.navigate("/login");
    } else {
      console.warn(
        "Navigate function not set. Using window.location as fallback.",
      );
      window.location.href = "/login";
    }
  },
  // Helper to check if token is expired
  isTokenExpired: (token) => {
    try {
      if (!token) return true;
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiryTime = payload.exp * 1000;
      const currentTime = Date.now();
      const bufferTime = 2 * 60 * 1000; // 2 minutes buffer
      return expiryTime - currentTime < bufferTime;
    } catch (error) {
      console.log(error);
      
      return true;
    }
  },
};

// Request interceptor - Check token before each request
api.interceptors.request.use(
  (config) => {
    // Skip auth check for certain requests
    if (config._skipAuth) {
      return config;
    }

    const token = TokenManager.getToken();

    if (token) {
      // Check if token is expired before making request
      if (TokenManager.isTokenExpired(token)) {
        console.warn("Token expired, will trigger refresh on 401 response");
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip interceptor for certain requests
    if (originalRequest._skipAuth) {
      return Promise.reject(error);
    }

    // Check if it's a 401 error and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If we're already refreshing, add to queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = TokenManager.getRefreshToken();
        const oldToken = TokenManager.getToken();

        // Check if we have the necessary tokens
        if (!refreshToken || !oldToken) {
          throw new Error("No refresh token available");
        }

        // Attempt to refresh the token
        const response = await axios.post(
          `${API_BASE_URL}/Token/refreshToken`,
          {
            token: oldToken,
            refreshToken: refreshToken,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            baseURL: "",
          },
        );

        const { token: newToken, refreshToken: newRefreshToken } =
          response.data.responseData;

        if (!newToken || !newRefreshToken) {
          throw new Error("Invalid token response");
        }

        // Update tokens in storage
        TokenManager.setTokens(newToken, newRefreshToken);

        // Update default headers
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        // Process queued requests
        processQueue(null, newToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        processQueue(refreshError, null);
        TokenManager.clearTokens();
        TokenManager.redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other types of errors
    if (error.response?.status === 403) {
      console.error("Access forbidden:", error.response.data);
    }

    return Promise.reject(error);
  },
);

// Additional utility function to check token status
export const checkTokenValidity = async () => {
  try {
    const token = TokenManager.getToken();
    if (!token) return false;

    // Check if token is expired
    return !TokenManager.isTokenExpired(token);
  } catch (error) {
    console.error("Error checking token validity:", error);
    return false;
  }
};

// Function to manually refresh token
export const refreshTokenManually = async () => {
  const refreshToken = TokenManager.getRefreshToken();
  const oldToken = TokenManager.getToken();

  if (!refreshToken || !oldToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/Token/refreshToken`,
      {
        token: oldToken,
        refreshToken: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        baseURL: "",
      },
    );

    const { token: newToken, refreshToken: newRefreshToken } =
      response.data.responseData;
    TokenManager.setTokens(newToken, newRefreshToken);
    api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

    return { token: newToken, refreshToken: newRefreshToken };
  } catch (error) {
    TokenManager.clearTokens();
    TokenManager.redirectToLogin();
    throw error;
  }
};

// Export the TokenManager for component integration
export { TokenManager };

export default api;
