import { cn } from "../../utils/util";

function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "border-border bg-card flex w-full flex-col rounded-2xl border-2 p-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
