// components/StatusBadge.jsx
const StatusBadge = ({
  status,
  activeText = "Active",
  inactiveText = "Inactive",
}) => {
  const baseClasses = "px-2 py-1 rounded-md text-xs font-medium";

  const getStatusClasses = () => {
    if (status === true || status === "Active" || status === "active") {
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    }
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
  };

  const getDisplayText = () => {
    if (status === true) return activeText;
    if (status === false) return inactiveText;
    return status;
  };

  return (
    <span className={`${baseClasses} ${getStatusClasses()}`}>
      {getDisplayText()}
    </span>
  );
};

export default StatusBadge;
