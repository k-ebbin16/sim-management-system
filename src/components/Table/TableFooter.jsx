import { cn } from "../../utils/util";

function TableFooter({ className, ...props }) {
  return (
    <tfoot
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

export default TableFooter;
