import { cn } from "../../utils/util";

function Card({ children, className = "", ...props }) {
  return (
    <div
      className={cn(
        "border-border bg-card flex w-full flex-col rounded-2xl border-2 p-2",
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
