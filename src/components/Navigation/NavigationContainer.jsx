import BackDrop from "./MobileHeader/BackDrop";
import MobileHeader from "./MobileHeader/MobileHeader";
import SideBar from "./SideBar/SideBar";
import { useState } from "react";

function NavigationContainer({
  navData,
  userProfile,
  setUserProfile,
  userProfileError,
}) {
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <MobileHeader
        hamburgerIsOpen={hamburgerIsOpen}
        setHamburgerIsOpen={setHamburgerIsOpen}
      />

      {/* Mobile Backdrop */}
      <BackDrop
        setHamburgerIsOpen={setHamburgerIsOpen}
        hamburgerIsOpen={hamburgerIsOpen}
      />

      {/* Main Sidebar */}
      <SideBar
        hamburgerIsOpen={hamburgerIsOpen}
        navData={navData}
        userProfile={userProfile}
        setUserprofile={setUserProfile}
        userProfileError={userProfileError}
      />
    </>
  );
}

export default NavigationContainer;
