// components/Table/BaseTable.jsx
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableEmpty from "./TableEmpty";
import { cn } from "../../utils/util";

const BaseTable = ({
  columns,
  data,
  searchTerm = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  onAdd,
  addButtonText = "Add New",
  title = "Data Management",
  description = "",
  isLoading = false,
  error = null,
  onRetry,
  showSearch = true,
  showAddButton = true,
}) => {
  const filteredData = data.filter((item) =>
    columns.some(
      (column) =>
        column.searchable !== false &&
        String(item[column.key] || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    ),
  );

  if (isLoading) {
    return (
      <div className="bg-card border-border rounded-lg border p-4 shadow-sm sm:p-6">
        <div className="flex items-center justify-center py-8 sm:py-12">
          <div className="text-center">
            <svg
              className="text-primary mx-auto h-8 w-8 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-card-foreground mt-3">Loading...</p>
            {description && (
              <p className="text-muted-foreground mt-2 text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (error && data.length === 0) {
    return (
      <div className="bg-card border-border rounded-lg border p-4 shadow-sm sm:p-6">
        <div className="py-8 text-center sm:py-12">
          <svg
            className="text-destructive mx-auto h-10 w-10 sm:h-12 sm:w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <p className="text-card-foreground mt-3 text-lg font-medium">
            Failed to load data
          </p>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            {error}
          </p>
          {description && (
            <p className="text-muted-foreground mt-2 text-sm">{description}</p>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4 rounded-lg px-4 py-2 text-sm transition-colors sm:text-base"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border-border rounded-lg border p-4 shadow-sm sm:p-6">
      <TableHeader
        title={title}
        description={description}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        searchPlaceholder={searchPlaceholder}
        onAdd={onAdd}
        addButtonText={addButtonText}
        totalCount={data.length}
        filteredCount={filteredData.length}
        showSearch={showSearch}
        showAddButton={showAddButton}
      />

      {error && data.length > 0 && (
        <div
          className={cn(
            "mb-4 rounded-lg p-3 sm:p-4",
            "bg-yellow-50 dark:bg-yellow-900/20",
            "text-xs text-yellow-800 sm:text-sm dark:text-yellow-300",
          )}
        >
          {error} (showing cached data)
        </div>
      )}

      {filteredData.length === 0 ? (
        <TableEmpty
          hasData={data.length > 0}
          searchTerm={searchTerm}
          colSpan={columns.length}
          columns={columns}
        />
      ) : (
        <TableBody
          columns={columns}
          data={filteredData}
          searchTerm={searchTerm}
        />
      )}
    </div>
  );
};

export default BaseTable;
