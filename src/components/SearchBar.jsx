// components/SearchBar.jsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../utils/util";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Input from "./Input";

/* import all the icons in Free Solid, Free Regular, and Brands styles */

library.add(fas, far, fab);

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  className,
}) => {
  return (
      <Input
        icon="fa-solid fa-search "
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "border-border bg-input-background w-full rounded-lg border py-2 pr-4 pl-9",
          "sm:w-64",
          "text-muted-foreground text-sm",
          className,
        )}
        autoComplete="none"
      />
  );
};

export default SearchBar;
