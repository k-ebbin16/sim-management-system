// components/StatusBadge.jsx
import { cn } from "../utils/util";

const StatusBadge = ({
  status,
  activeText = "Active",
  inactiveText = "Inactive",
  variant = "default", // default, primary, accent, muted, outline, solid
}) => {
  const baseClasses =
    "px-2 py-1 rounded-md text-xs font-medium transition-colors";

  const getStatusClasses = () => {
    const isActive =
      status === true || status === "Active" || status === "active";

    switch (variant) {
      case "primary":
        return isActive
          ? "bg-primary/20 text-primary border border-primary/30 dark:bg-primary/15 dark:text-primary-foreground dark:border-primary/40"
          : "bg-destructive/20 text-destructive border border-destructive/30 dark:bg-destructive/15 dark:text-destructive-foreground dark:border-destructive/40";

      case "accent":
        return isActive
          ? "bg-accent/20 text-accent-foreground border border-accent/30 dark:bg-accent/25 dark:text-accent-foreground dark:border-accent/40"
          : "bg-muted/80 text-muted-foreground border border-border dark:bg-muted dark:text-muted-foreground dark:border-border";

      case "muted":
        return isActive
          ? "bg-secondary text-secondary-foreground border border-border dark:bg-secondary dark:text-secondary-foreground dark:border-border"
          : "bg-muted text-muted-foreground border border-border dark:bg-muted dark:text-muted-foreground dark:border-border";

      case "outline":
        return isActive
          ? "bg-transparent text-primary border border-primary dark:text-primary-foreground dark:border-primary"
          : "bg-transparent text-destructive border border-destructive dark:text-destructive-foreground dark:border-destructive";

      case "solid":
        return isActive
          ? "bg-primary text-primary-foreground border border-primary dark:bg-primary dark:text-primary-foreground"
          : "bg-destructive text-destructive-foreground border border-destructive dark:bg-destructive dark:text-destructive-foreground";

      default: // default variant
        return isActive
          ? "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/30"
          : "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/30";
    }
  };

  const getDisplayText = () => {
    if (status === true) return activeText;
    if (status === false) return inactiveText;
    return status;
  };

  return (
    <span className={cn(baseClasses, getStatusClasses())}>
      {getDisplayText()}
    </span>
  );
};

export default StatusBadge;
