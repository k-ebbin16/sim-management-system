// components/AddButton.jsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../utils/util";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */

library.add(fas, far, fab);

const Button = ({
  onClick,
  children ,
  icon = "",
  iconBeforeText = false,
  className
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 rounded-lg px-4 py-2",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "focus:ring-ring transition-colors duration-300 focus:ring-2 focus:ring-offset-2",
        iconBeforeText ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {children}
      <FontAwesomeIcon icon={icon} className="text-sm" />
    </button>
  );
};

export default Button;
