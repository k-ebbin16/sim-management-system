import Hamburger from "./Hamburger";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
function Header({ navData }) {
  const [menuShowing, setMenuShowing] = useState(false);
  const handleHamburger = () => {
    setMenuShowing(!menuShowing);
  };

  return (
    <header className="fixed top-0 z-50 h-24 w-full bg-white px-4 shadow-md lg:h-20">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-2 pt-5 lg:px-3">
        <h1 className="cursor-pointer text-3xl font-bold">SIM Management</h1>

        <Hamburger
          menuShowing={menuShowing}
          handleHamburger={handleHamburger}
        />

        <div
          className={`fixed inset-0 bg-gray-200/10 backdrop-blur-sm transition-opacity duration-300 ${
            menuShowing ? "visible opacity-100" : "invisible opacity-0"
          } lg:hidden`}
          onClick={handleHamburger}
        ></div>

        <nav
          className={`fixed top-0 right-0 h-full w-2/3 max-w-sm transform bg-gray-700 p-16 transition-transform duration-300 ease-in-out ${
            menuShowing ? "" : "translate-x-full"
          } lg:static lg:h-auto lg:w-auto lg:max-w-none lg:-translate-x-0 lg:bg-transparent lg:p-0 lg:transition-none`}
        >
          <ul className="mx-8 flex h-full w-full flex-col items-end justify-center gap-y-20 text-2xl font-medium backdrop-blur-sm md:text-3xl lg:mx-0 lg:flex-row lg:items-center lg:gap-x-8 lg:text-lg lg:font-normal">
            {navData.map(({ id, title, link }) => (
              <li
                key={id}
                className="navlink cursor-pointer text-right text-white transition-all duration-300 hover:scale-110 hover:text-blue-400 lg:text-black lg:hover:text-lg"
              >
                <NavLink to={link}>{title}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
