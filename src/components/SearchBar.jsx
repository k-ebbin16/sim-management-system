// components/SearchBar.jsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../utils/util";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */

library.add(fas, far, fab);

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full sm:w-auto">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <FontAwesomeIcon
          icon="fa-solid fa-search "
          className="text-muted-foreground text-sm"
        />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "border-border bg-input-background w-full rounded-lg border py-2 pr-4 pl-9",
          "text-foreground placeholder-muted-foreground",
          "focus:border-ring focus:ring-ring transition-colors focus:ring-2",
          "sm:w-64",
        )}
      />
    </div>
  );
};

export default SearchBar;
