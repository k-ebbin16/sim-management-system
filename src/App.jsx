import "./App.css";

import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { v4 as uuid } from "uuid";
import useAuthenticate from "./hooks/useAuthenticate";

function App() {
  const authenticationObject = useAuthenticate();

  const navData = [
    {
      id: uuid(),
      title: "Dashboard",
      link: "/",
      description: "",
      icon: "fa-solid fa-house",
    },
    {
      id: uuid(),
      title: "Student Records",
      link: "/student-records",
      description: "Browse all student SIM records",
      icon: "fa-solid fa-table",
    },
    {
      id: uuid(),
      title: "Assign SIM Cards",
      link: "/assign",
      description: "Filter and Manage SIM assignments",
      icon: "fa-solid fa-sim-card",
    },
    {
      id: uuid(),
      title: "System Users",
      link: "/system-users",
      description: "View an individual students details",
      icon: "fa-solid fa-users",
    },
    {
      id: uuid(),
      name: "",
      title: "Add Users",
      link: "/users",
      description: "Manage system users and permissions",
      icon: "fa-solid fa-user-plus",
    },
  ];

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute
            isAuthenticated={authenticationObject.isAuthenticated}
          >
            <HomePage navData={navData} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <LoginPage isAuthenticated={authenticationObject.isAuthenticated} />
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
