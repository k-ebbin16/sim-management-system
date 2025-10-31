import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useContext, useEffect, useState } from "react";

import AuthContext from "./context/AuthContext";
import NavigationContainer from "./components/Navigation/NavigationContainer";
import ProtectedRoute from "./components/ProtectedRoute";
import PulseLoading from "./components/Loading/PulseLoading";
import UserProfileContext from "./context/UserProfileContext";
import { v4 as uuid } from "uuid";

// Lazy load components
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SysUsersPage = lazy(() => import("./pages/SystemUsersPage/SysUsersPage"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const { getCurrentUserProfile, userProfile, currentUserRoles } =
    useContext(UserProfileContext);

  const [userProfileError, setUserProfileError] = useState(null);

  useEffect(() => {
    const getUserProfileData = async () => {
      try {
        setUserProfileError(null);
        const profileResult = await getCurrentUserProfile();

        if (profileResult.isSuccessful) {
          setUserProfileError(null);
        } else {
          setUserProfileError(
            profileResult.message || "Failed to fetch user profile",
          );
        }
      } catch (err) {
        console.error("Error in getUsersProfileData:", err);
        setUserProfileError("User Profile Error!");
      }
    };
    if (isAuthenticated) getUserProfileData();
  }, [isAuthenticated]);

  const navData = [
    {
      id: uuid(),
      title: "Dashboard",
      link: "/",
      description: "",
      icon: "fa-solid fa-house",
      pageComponent: HomePage,
      addToNav: true,
    },
    {
      id: uuid(),
      title: "Student Records",
      link: "/student-records",
      description: "Browse all student SIM records",
      icon: "fa-solid fa-table",
      addToNav: true,
    },
    {
      id: uuid(),
      title: "Assign SIM Cards",
      link: "/assign",
      description: "Filter and Manage SIM assignments",
      icon: "fa-solid fa-sim-card",
      addToNav: true,
    },
    {
      id: uuid(),
      title: "User Administration",
      link: "/system-users",
      description: "View an individual students details",
      icon: "fa-solid fa-users",
      pageComponent: SysUsersPage,
      addToNav: true,
    },
    {
      id: uuid(),
      name: "",
      title: "Add Users",
      link: "/add-users",
      description: "Manage system users and permissions",
      icon: "fa-solid fa-user-plus",
      addToNav: true,
    },
    {
      id: uuid(),
      name: "",
      title: "Role Permissions",
      link: "/roles/permissions/:roleId",
      description: "Manage role permissions",
      icon: "fa-solid fa-user-tie",
      addToNav: false,
    },
    
  ];

  return (
    <Routes>
      {/* Login Page */}
      <Route
        path="/login"
        element={
          <Suspense fallback={<PulseLoading />}>
            <LoginPage isAuthenticated={isAuthenticated} />
          </Suspense>
        }
      />

      {navData.map((nav) => (
        <Route
          key={nav.id}
          path={nav.link}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <div className="flex">
                <NavigationContainer
                  navData={navData}
                  userProfile={userProfile}
                  userProfileError={userProfileError}
                  currentUserRoles={currentUserRoles}
                />
                <Suspense fallback={<PulseLoading />}>
                  <nav.pageComponent navData={navData} />
                </Suspense>
              </div>
            </ProtectedRoute>
          }
        />
      ))}

      {/* Not Found */}
      <Route
        path="*"
        element={
          <Suspense fallback={<PulseLoading />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
