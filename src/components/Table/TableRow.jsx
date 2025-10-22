import { cn } from "../../utils/util";

function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export default TableRow;
