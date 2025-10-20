import SideBar from "../../components/SideBar/SideBar";
import Dashboard from "./Dashboard";

function HomePage({ navData, setIsAuthenticated }) {
  return (
    <div className="bg-background w- flex min-h-screen">
      {/* Navigation */}
      <SideBar navData={navData} setIsAuthenticated={setIsAuthenticated} />

      {/* Dashboard */}
      <Dashboard />
    </div>
  );
}

export default HomePage;
