import "./App.css";

import { Route, Routes } from "react-router-dom";

import AuthContext from "./context/AuthContext";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";
import { v4 as uuid } from "uuid";
import SysUsersPage from "./pages/SystemUsersPage/SysUsersPage";
import UserDataProvider from "./context/providers/UsersDataContextProvider";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  const navData = [
    {
      id: uuid(),
      title: "Dashboard",
      link: "/",
      description: "",
      icon: "fa-solid fa-house",
      pageComponent: HomePage,
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
      pageComponent: SysUsersPage,
    },
    {
      id: uuid(),
      name: "",
      title: "Add Users",
      link: "/add-users",
      description: "Manage system users and permissions",
      icon: "fa-solid fa-user-plus",
    },
  ];

  return (
    <Routes>
      {/* Login Page */}
      <Route
        path="/login"
        element={<LoginPage isAuthenticated={isAuthenticated} />}
      />

      {navData.map((nav) => (
        <Route
          key={nav.id}
          path={nav.link}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserDataProvider>
                <nav.pageComponent navData={navData} />
              </UserDataProvider>
            </ProtectedRoute>
          }
        />
      ))}

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
