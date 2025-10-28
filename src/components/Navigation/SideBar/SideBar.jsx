import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../Logo";
import LogoutBtn from "./LogoutBtn";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { useContext, useEffect, useState } from "react";
import UserProfileContext from "../../../context/UserProfileContext";

library.add(fas, far, fab);

function SideBar({
  navData,
  hamburgerIsOpen,
  userProfile,
  setUserProfile,
  userProfileError,
}) {
  return (
    <aside
      className={`bg-sidebar text-sidebar-foreground fixed z-[999] flex h-dvh w-3/4 max-w-xs flex-col gap-y-4 pt-[80px] transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:left-0 lg:w-2/5 lg:translate-x-0 lg:pt-0 ${hamburgerIsOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} lg:opacity-100`}
    >
      {/* User Info & Logo*/}
      <div className="border-sidebar-border flex flex-col border-b">
        {/* Logo */}
        <div className="border-sidebar-border hidden w-full items-center gap-4 border-b p-6 lg:flex">
          <Logo className="bg-accent text-primary h-12 w-12 text-3xl" />
        </div>
        {/* User Info */}
        <div className="flex items-center gap-x-4 p-6">
          <div className="bg-sidebar-accent flex h-12 w-12 items-center justify-center overflow-hidden rounded-full lg:h-14 lg:w-14">
            <FontAwesomeIcon
              icon="fa-solid fa-user "
              className="inline-block text-2xl"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sidebar-primary text-md lg:text-xl">
              {userProfile?.displayName}
            </p>
            <p className="text-sm lg:text-lg">System Admin</p>
            {userProfileError && (
              <p className="text-destructive text-sm">{userProfileError}</p>
            )}
          </div>
        </div>
      </div>
      {/* Nav Box */}
      <nav className="border-sidebar-border flex w-full flex-1 flex-col gap-y-2 border-b p-4">
        {navData.map(({ id, title, link, icon }) => (
          <NavLink
            to={link}
            key={id}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
              } transition-background flex items-center gap-6 rounded-md px-4 py-6 font-medium transition duration-400`
            }
          >
            <FontAwesomeIcon icon={icon} className="text-lg" />
            <span>{title}</span>
          </NavLink>
        ))}
      </nav>
      <div className="w-full px-8 pb-8">
        {/* Theme Toggler */}
        <ThemeToggle />

        {/* Logout Button */}
        <LogoutBtn setUserProfile={setUserProfile} />
      </div>
    </aside>
  );
}

export default SideBar;
