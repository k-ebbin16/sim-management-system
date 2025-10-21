import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function SideBar({ navData, hamburgerIsOpen }) {
  return (
    <aside
      className={`bg-sidebar text-sidebar-foreground fixed z-[999] flex h-screen w-3/4 max-w-xs flex-col gap-y-4 pt-[80px] transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:left-0 lg:w-2/5 lg:translate-x-0 lg:pt-0 ${hamburgerIsOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} lg:opacity-100`}
    >
      {/* Backdrop */}

      {/* User Info & Logo*/}
      <div className="border-sidebar-border flex flex-col border-b">
        {/* Logo */}
        <div className="border-sidebar-border hidden w-full items-center gap-4 border-b p-6 lg:flex">
          <Logo
            width="12"
            height="12"
            fontSize="3xl"
            bgColor="accent"
            iconColor="primary"
          />
          <h1 className="text-accent text-2xl">SimCard Manager</h1>
        </div>
        {/* User Info */}
        <div className="flex items-center gap-x-4 p-6">
          <div className="bg-sidebar-accent flex h-12 w-12 items-center justify-center overflow-hidden rounded-full lg:h-14 lg:w-14">
            <i className="fa-solid fa-user inline-block text-2xl"></i>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sidebar-primary text-lg lg:text-xl">
              Kwamina Ebbin
            </p>
            <p className="text-sm lg:text-lg">System Admin</p>
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
            <i className={`${icon} text-lg`}></i>
            <span>{title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="w-full px-8 pb-8">
        {/* Theme Toggler */}
        <ThemeToggle />

        {/* Logout Button */}
        <LogoutBtn />
      </div>
    </aside>
  );
}

export default SideBar;
