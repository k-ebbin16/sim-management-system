import { cn } from "../../utils/util";

// src/components/Loading/PulseLoading.js
const PulseLoading = ({ size = "medium", text = "Loading..." }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="grid place-items-center w-full h-screen">
      <div className="flex flex-col items-center justify-center gap-3 p-6">
        <div className={cn("relative", sizeClasses[size])}>
          <div className="bg-primary/20 absolute inset-0 animate-ping rounded-full"></div>
          <div className="bg-primary absolute inset-0 rounded-full"></div>
        </div>
        <p className="text-muted-foreground animate-pulse text-sm">{text}</p>
      </div>
    </div>
  );
};

export default PulseLoading;
