import Dashboard from "./Dashboard";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import SideBar from "../../components/SideBar/SideBar";
import { useState } from "react";

function HomePage({ navData, setIsAuthenticated }) {
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

  return (
    <div className="bg-background w- flex min-h-screen">
      {/* Mobile Header */}
      <MobileHeader
        hamburgerIsOpen={hamburgerIsOpen}
        setHamburgerIsOpen={setHamburgerIsOpen}
      />

      {/* Navigation */}
      <SideBar
        hamburgerIsOpen={hamburgerIsOpen}
        navData={navData}
        setIsAuthenticated={setIsAuthenticated}
      />

      {/* Dashboard */}
      <Dashboard />
    </div>
  );
}

export default HomePage;
