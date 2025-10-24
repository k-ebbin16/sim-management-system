// components/SearchBar.jsx
import { cn } from "../utils/util";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full sm:w-auto">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="text-muted-foreground h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
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
