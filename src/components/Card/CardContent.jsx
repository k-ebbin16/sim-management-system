import { cn } from "../../utils/util";

function CardContent({ children, className = "", ...props }) {
  return (
    <div
      className={cn("flex flex-row items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default CardContent;
