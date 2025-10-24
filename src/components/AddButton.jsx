// components/AddButton.jsx
import { cn } from "../utils/util";

const AddButton = ({ onClick, text = "Add New" }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 rounded-lg px-4 py-2",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "focus:ring-ring transition-colors focus:ring-2 focus:ring-offset-2",
      )}
    >
      <svg
        className="h-4 w-4 sm:h-5 sm:w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
      {text}
    </button>
  );
};

export default AddButton;
