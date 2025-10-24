import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../utils/util";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas, far, fab);

function Logo({ className = "", textSize = "", showText = true }) {
  return (
    <>
      <div
        className={cn(
          className,
          "flex items-center justify-center rounded-lg text-center",
        )}
      >
        <FontAwesomeIcon icon="fa-solid fa-sim-card" />
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
