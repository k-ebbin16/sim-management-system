import "./index.css";

import App from "./App.jsx";
import AuthProvider from "./context/providers/AuthContextProvider";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import ThemeProvider from "./context/providers/ThemeContextProvider";
import { createRoot } from "react-dom/client";
import UserProfileProvider from "./context/providers/UserProfileContextProvider.jsx";
import RolesDataProvider from "./context/providers/RolesDataContextProvider.jsx";
import UserDataProvider from "./context/providers/UsersDataContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <UserProfileProvider>
            <RolesDataProvider>
              <UserDataProvider>
                <App />
              </UserDataProvider>
            </RolesDataProvider>
          </UserProfileProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
