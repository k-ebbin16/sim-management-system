import { cn } from "../utils/util";

function Logo({ className = "", textSize = "", showText = true }) {
  return (
    <>
      <div
        className={cn(
          className,
          "flex items-center justify-center rounded-lg text-center",
        )}
      >
        <i className="fa-solid fa-sim-card"></i>
      </div>
      {showText && (
        <h1 className={cn("text-accent text-2xl", textSize)}>
          SimCard Manager
        </h1>
      )}
    </>
  );
}

export default Logo;
