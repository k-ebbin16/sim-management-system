import { cn } from "../../utils/util";

function TableHeader({ className, ...props }) {
  return <thead className={cn("[&_tr]:border-b", className)} {...props} />;
}

export default TableHeader;
