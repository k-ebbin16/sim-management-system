import "./index.css";

import App from "./App.jsx";
import AuthProvider from "./context/providers/AuthContextProvider";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import ThemeProvider from "./context/providers/ThemeContextProvider";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
