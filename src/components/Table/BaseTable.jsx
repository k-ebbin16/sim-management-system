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
            <i className="fa-solid fa-spinner text-primary mb-3 animate-spin text-2xl"></i>
            <p className="text-card-foreground">Loading...</p>
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
          <i className="fa-solid fa-triangle-exclamation text-destructive mb-3 text-2xl"></i>
          <p className="text-card-foreground text-lg font-medium">
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
          <i className="fa-solid fa-triangle-exclamation mr-2"></i>
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
