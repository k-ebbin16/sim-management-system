import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/Tabs";
import Card from "../../components/Card/Card";
import CardContent from "../../components/Card/CardContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../../components/SearchBar";
import PermissionItem from "./PermissionItem";

function PermissionsManager({
  roleInfo,
  rolePermissions,
  activeTab,
  searchQuery,
  onTabChange,
  onSearchChange,
  onTogglePermission,
}) {
  const categories = [...new Set(rolePermissions.map((p) => p.group))];
  const totalPermissions = rolePermissions.length;

  // Filter permissions based on search query and active tab
  const filteredPermissions = rolePermissions.filter((permission) => {
    const matchesSearch =
      permission.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      permission.claimValue
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      permission.group?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "all" || permission.group === activeTab;

    return matchesSearch && matchesTab;
  });

  const searchResultsCount = filteredPermissions.length;

  return (
    <Card>
      {/* Title and Description Section */}
      <div className="mb-4 p-4 pb-0 sm:mb-6 sm:p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-card-foreground text-lg font-medium sm:text-xl">
            Manage Permissions
          </h2>
          <p className="text-muted-foreground max-w-2xl text-sm">
            Enable or disable specific permissions for the {roleInfo.name} role
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-2">
        <div className="relative">
          <SearchBar
            className="sm:w-full"
            icon="fa-solid fa-search"
            placeholder="Search permissions by name, description, or group..."
            type="text"
            value={searchQuery}
            onChange={onSearchChange}
          />

          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform"
            >
              <FontAwesomeIcon icon="fa-solid fa-times" className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <CardContent className="p-4 pt-0">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="h-auto w-full flex-wrap justify-start gap-1 sm:gap-2">
            <TabsTrigger
              value="all"
              className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
            >
              All ({searchQuery ? searchResultsCount : totalPermissions})
            </TabsTrigger>
            {categories.map((category) => {
              const categoryCount = searchQuery
                ? filteredPermissions.filter((p) => p.group === category).length
                : rolePermissions.filter((p) => p.group === category).length;

              return (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
                >
                  {category} ({categoryCount})
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={activeTab} className="mt-4 sm:mt-6">
            <SearchResultsInfo
              searchQuery={searchQuery}
              searchResultsCount={searchResultsCount}
              onClearSearch={() => onSearchChange("")}
            />

            <PermissionsList
              permissions={filteredPermissions}
              onTogglePermission={onTogglePermission}
              searchQuery={searchQuery}
              onClearSearch={() => onSearchChange("")}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function SearchResultsInfo({ searchQuery, searchResultsCount, onClearSearch }) {
  if (!searchQuery) return null;

  return (
    <div className="mb-4 flex items-center justify-between">
      <p className="text-muted-foreground text-sm">
        {searchResultsCount} result{searchResultsCount !== 1 ? "s" : ""} found
        for "{searchQuery}"
      </p>
      <button
        onClick={onClearSearch}
        className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-medium"
      >
        <FontAwesomeIcon icon="fa-solid fa-times" className="h-3 w-3" />
        Clear search
      </button>
    </div>
  );
}

function PermissionsList({
  permissions,
  onTogglePermission,
  searchQuery,
  onClearSearch,
}) {
  if (permissions.length === 0) {
    return (
      <EmptyState searchQuery={searchQuery} onClearSearch={onClearSearch} />
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {permissions.map((permission) => (
        <PermissionItem
          key={permission.claimValue}
          permission={permission}
          onToggle={onTogglePermission}
        />
      ))}
    </div>
  );
}

function EmptyState({ searchQuery, onClearSearch }) {
  return (
    <div className="py-8 text-center sm:py-12">
      <FontAwesomeIcon
        icon="fa-solid fa-shield"
        className="text-muted-foreground/30 mx-auto mb-3 h-8 w-8 sm:mb-4 sm:h-12 sm:w-12"
      />
      <p className="text-muted-foreground text-sm sm:text-base">
        {searchQuery
          ? `No permissions found for "${searchQuery}"`
          : "No permissions found matching your search"}
      </p>
      {searchQuery && (
        <button
          onClick={onClearSearch}
          className="text-primary hover:text-primary/80 mt-2 text-sm font-medium"
        >
          Clear search
        </button>
      )}
    </div>
  );
}

export default PermissionsManager;
