import Dashboard from "./Dashboard";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import SideBar from "../../components/SideBar/SideBar";
import { useState } from "react";

function HomePage({ navData }) {
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

  return (
    <div className="bg-background w- flex min-h-screen">
      {/* Mobile Header */}
      <MobileHeader
        hamburgerIsOpen={hamburgerIsOpen}
        setHamburgerIsOpen={setHamburgerIsOpen}
      />
      <div
        className={`bg-accent/20 fixed top-0 left-0 z-10 min-h-screen w-screen transition duration-300 ${hamburgerIsOpen ? "opacity-100 backdrop-blur-xs" : "opacity-0 backdrop-blur-none"}`}
        onClick={() => {
          setHamburgerIsOpen(false);
        }}
      ></div>

      {/* Navigation */}
      <SideBar hamburgerIsOpen={hamburgerIsOpen} navData={navData} />

      {/* Dashboard */}
      <Dashboard />
    </div>
  );
}

export default HomePage;
