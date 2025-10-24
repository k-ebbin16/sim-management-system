import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeContext from "../../../context/ThemeContext";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useContext } from "react";

library.add(fas, far, fab);

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        {theme === "dark" ? (
          <FontAwesomeIcon
            icon="fa-solid fa-moon "
            className="rotate-0 transition-transform duration-500"
          />
        ) : (
          <FontAwesomeIcon
            icon="fa-solid fa-sun "
            className="rotate-180 transition-transform duration-500"
          />
        )}
        <label
          htmlFor="theme-toggle"
          className="text-sidebar-foreground cursor-pointer text-sm"
        >
          {`${theme === "dark" ? "Dark" : "Light"}`} Mode
        </label>
      </div>
      <button
        id="theme-toggle"
        role="switch"
        aria-checked={theme === "dark"}
        onClick={() => toggleTheme()}
        className={`focus-visible:ring-accent focus-visible:ring-offset-sidebar relative inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
          theme === "dark" ? "bg-primary" : "bg-switch-background"
        }`}
      >
        <span
          className={`bg-card pointer-events-none block size-4 rounded-full transition-transform ${
            theme === "dark" ? "translate-x-[calc(100%-2px)]" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default ThemeToggle;
