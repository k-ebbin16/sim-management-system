import { cn } from "../utils/util";

function Label({ children, className, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
    >
      {children}
    </label>
  );
}

export default Label;
