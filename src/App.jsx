import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <LoginPage
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
