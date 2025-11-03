// components/Table/TableHeader.jsx
import SearchBar from "../SearchBar";
import Button from "../Button";

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
      <div className="mb-6 flex flex-col justify-between lg:flex-row">
        <div className="flex flex-col gap-2 sm:gap-3">
          <h2 className="text-card-foreground text-xl font-medium sm:text-2xl">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground max-w-2xl text-sm lg:text-base">
              {description}
            </p>
          )}
        </div>
        <div>
          {showAddButton && (
            <Button
              onClick={onAdd}
              icon="fa-solid fa-plus"
              iconBeforeText={true}
              className="text-sm"
            >
              {addButtonText}
            </Button>
          )}
        </div>
      </div>

      {/* Search and Actions Section */}
      <div className="mb-6 flex w-full flex-col items-start justify-between sm:flex-row sm:items-center">
        {/* Results Count - Now on the left */}
        <div className="text-muted-foreground mb-2 text-sm text-nowrap lg:mb-0">
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

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          {showSearch && (
            <SearchBar
              value={searchTerm}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TableHeader;
