// components/Avatar.jsx
import { useState } from "react";
import { cn } from "../../utils/util";

const Avatar = ({
  src,
  name = "",
  size = "md", // xs, sm, md, lg, xl
  className = "",
  fallbackBackground = "bg-primary",
  fallbackTextColor = "text-primary-foreground",
  showTooltip = false,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
    xl: "h-16 w-16 text-xl",
  };

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "?";

    // Remove extra spaces and split into words
    const words = name.trim().split(/\s+/);

    if (words.length === 1) {
      // Single word - take first 2 characters
      return words[0].substring(0, 2).toUpperCase();
    } else {
      // Multiple words - take first character of first two words
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const initials = getInitials(name);
  const sizeClass = sizes[size] || sizes.md;

  const avatarContent = (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        sizeClass,
        className,
        (!src || imageError) &&
          cn(fallbackBackground, fallbackTextColor, "border-border border"),
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={name ? `${name}'s avatar` : "Avatar"}
          className="h-full w-full rounded-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <span className="font-semibold tracking-tight">{initials}</span>
      )}
    </div>
  );

  if (showTooltip && name) {
    return (
      <div className="group relative">
        {avatarContent}
        <div className="bg-foreground text-background pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {name}
          <div className="border-t-foreground absolute top-full left-1/2 -translate-x-1/2 transform border-4 border-transparent"></div>
        </div>
      </div>
    );
  }

  return avatarContent;
};

export default Avatar;
