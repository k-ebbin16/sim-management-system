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
      <i className="fa-solid fa-plus text-sm"></i>
      {text}
    </button>
  );
};

export default AddButton;
