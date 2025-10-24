// components/AvatarGroup.jsx
import Avatar from "./Avatar";
import { cn } from "../utils/util";

const AvatarGroup = ({
  users = [],
  max = 5,
  size = "md",
  spacing = "overlap", // overlap, separate
  variant = "default",
  className = "",
}) => {
  const visibleUsers = users.slice(0, max);
  const hiddenCount = users.length - max;

  const spacingClass = spacing === "overlap" ? "-space-x-2" : "space-x-2";

  const sizeClasses = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  return (
    <div className={cn("flex items-center", spacingClass, className)}>
      {visibleUsers.map((user, index) => (
        <Avatar
          key={user.id || index}
          src={user.avatar || user.image}
          name={user.name || user.displayName || user.email}
          size={size}
          variant={variant}
          className="border-background dark:border-card border-2"
        />
      ))}
      {hiddenCount > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full font-medium",
            "bg-muted/80 text-muted-foreground border-background dark:border-card border-2",
            sizeClasses[size],
          )}
        >
          +{hiddenCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
