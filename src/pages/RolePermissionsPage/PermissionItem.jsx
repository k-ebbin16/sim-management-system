function PermissionItem({ permission, onToggle }) {
  return (
    <div className="bg-card hover:bg-accent/5 border-border flex flex-col justify-between gap-3 rounded-lg border p-3 transition-colors sm:flex-row sm:items-start sm:gap-4 sm:p-4">
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-1 sm:gap-2">
          <p className="text-card-foreground text-sm font-medium break-words sm:text-base">
            {permission.description}
          </p>
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {permission.isAssignedToRole && (
              <span className="bg-primary/20 text-primary rounded px-2 py-1 text-xs whitespace-nowrap">
                Active
              </span>
            )}
            <span className="text-muted-foreground border-border rounded border px-2 py-1 text-xs whitespace-nowrap">
              {permission.group}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground text-xs break-words sm:text-sm">
          {permission.claimValue}
        </p>
      </div>
      <div className="flex-shrink-0 self-start sm:self-center">
        <div
          className={`flex h-5 w-10 cursor-pointer items-center rounded-full p-0.5 transition-colors sm:h-6 sm:w-11 sm:p-1 ${
            permission.isAssignedToRole ? "bg-primary" : "bg-switch-background"
          }`}
          onClick={() => onToggle(permission.claimValue)}
        >
          <div
            className={`bg-background h-4 w-4 transform rounded-full shadow-md transition-transform ${
              permission.isAssignedToRole
                ? "translate-x-5 sm:translate-x-5"
                : "translate-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default PermissionItem;
