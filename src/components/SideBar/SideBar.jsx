import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function SideBar({ navData, setIsAuthenticated, hamburgerIsOpen }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = (checked) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };
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
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            {isDarkMode ? (
              <i class="fa-solid fa-moon"></i>
            ) : (
              <i class="fa-solid fa-sun"></i>
            )}
            <label
              htmlFor="theme-toggle"
              className="text-sidebar-foreground cursor-pointer text-sm"
            >
              {`${isDarkMode ? "Dark" : "Light"}`} Mode
            </label>
          </div>
          <button
            id="theme-toggle"
            role="switch"
            aria-checked={isDarkMode}
            onClick={() => toggleTheme(!isDarkMode)}
            className={`focus-visible:ring-accent focus-visible:ring-offset-sidebar relative inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
              isDarkMode ? "bg-primary" : "bg-switch-background"
            }`}
          >
            <span
              className={`bg-card pointer-events-none block size-4 rounded-full transition-transform ${
                isDarkMode ? "translate-x-[calc(100%-2px)]" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Logout Button */}
        <div
          className="hover:bg-sidebar-accent/50 text-sidebar-foreground transition-background flex items-center gap-6 rounded-md px-4 py-6 text-xl font-medium transition duration-400"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <button className="w-full text-left">Logout</button>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
