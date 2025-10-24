// components/Table/TableHeader.jsx
import SearchBar from "../SearchBar";
import AddButton from "../AddButton";

const TableHeader = ({
  title,
  description,
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  onAdd,
  addButtonText,
  totalCount,
  filteredCount,
  showSearch = true,
  showAddButton = true,
}) => {
  return (
    <>
      {/* Title and Description Section */}
      <div className="mb-6">
        <div className="flex flex-col gap-2 sm:gap-3">
          <h2 className="text-card-foreground text-xl font-medium sm:text-2xl">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Search and Actions Section */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        {/* Results Count - Now on the left */}
        <div className="text-muted-foreground text-sm">
          Showing {filteredCount} of {totalCount} items
          {searchTerm && (
            <span>
              {" "}
              for "
              <span className="text-foreground font-medium">
                "{searchTerm}"
              </span>
              "
            </span>
          )}
        </div>

        {(showSearch || showAddButton) && (
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            {showSearch && (
              <SearchBar
                value={searchTerm}
                onChange={onSearchChange}
                placeholder={searchPlaceholder}
              />
            )}

            {showAddButton && (
              <AddButton onClick={onAdd} text={addButtonText} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TableHeader;
