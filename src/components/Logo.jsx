import { cn } from "../utils/util";

function Logo({ className }) {
  return (
    <div
      className={cn(
        className,
        "flex items-center justify-center rounded-lg text-center",
      )}
    >
      <i className="fa-solid fa-sim-card"></i>
    </div>
  );
}

export default Logo;
