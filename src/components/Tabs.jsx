import * as React from "react";

import { cn } from "../utils/util";

function Tabs({
  className,
  defaultValue,
  value,
  onValueChange,
  children,
  ...props
}) {
  const [activeTab, setActiveTab] = React.useState(defaultValue || value || "");

  React.useEffect(() => {
    if (value !== undefined) {
      setActiveTab(value);
    }
  }, [value]);

  const handleTabChange = (newValue) => {
    if (value === undefined) {
      setActiveTab(newValue);
    }
    onValueChange?.(newValue);
  };

  const contextValue = React.useMemo(
    () => ({
      activeTab,
      setActiveTab: handleTabChange,
    }),
    [activeTab, handleTabChange],
  );

  return (
    <div
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { contextValue })
          : child,
      )}
    </div>
  );
}

function TabsList({ className, contextValue, children, ...props }) {
  return (
    <div
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground flex inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px]",
        className,
      )}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && child.type === TabsTrigger
          ? React.cloneElement(child, { contextValue })
          : child,
      )}
    </div>
  );
}

function TabsTrigger({ className, value, contextValue, children, ...props }) {
  const isActive = contextValue?.activeTab === value;

  const handleClick = () => {
    contextValue?.setActiveTab(value);
  };

  return (
    <button
      data-slot="tabs-trigger"
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        isActive &&
          "bg-card dark:text-foreground dark:border-input dark:bg-input/30",
        className,
      )}
      onClick={handleClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

function TabsContent({ className, value, contextValue, children, ...props }) {
  const isActive = contextValue?.activeTab === value;

  if (!isActive) {
    return null;
  }

  return (
    <div
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
