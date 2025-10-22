import { cn } from "../../../utils/util";

function BackDrop({ hamburgerIsOpen, setHamburgerIsOpen, className = "" }) {
  return (
    <div
      className={cn(
        className,
        "bg-accent/20 fixed top-0 left-0 z-10 min-h-dvh w-screen transition duration-300 hidden",
        hamburgerIsOpen
          ? "opacity-100 backdrop-blur-xs block"
          : "opacity-0 backdrop-blur-none",
      )}
      onClick={() => {
        setHamburgerIsOpen(false);
      }}
    ></div>
  );
}

export default BackDrop;
