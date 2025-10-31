import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/Tabs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../components/Button";
import Card from "../../components/Card/Card";
import CardContent from "../../components/Card/CardContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../components/Input";
import api from "../../api/axios";
import { cn } from "../../utils/util";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import SearchBar from "../../components/SearchBar";

library.add(fas, far, fab);

function RolePermissionsPage() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [roleInfo, setRoleInfo] = useState({ name: "", description: "" });
  const [rolePermissions, setRolePermissions] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getRolePermissions = async () => {
      try {
        const response = await api.get(`/Roles/permissions/${roleId}`);
        setRoleInfo(response?.data.responseData.role || {});
        setRolePermissions(response?.data.responseData.roleClaims || []);
      } catch (error) {
        console.error("Error fetching role permissions:", error);
      }
    };
    getRolePermissions();
  }, [roleId]);

  // Handle toggle permission
  const handleTogglePermission = (claimValue) => {
    setRolePermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission.claimValue === claimValue
          ? { ...permission, isAssignedToRole: !permission.isAssignedToRole }
          : permission,
      ),
    );
    setHasChanges(true);
  };

  // Handle save changes
  const handleSave = async () => {
    if (!hasChanges) return;

    try {
      setIsSaving(true);

      const updatePayload = {
        roleId: roleId,
        roleClaims: rolePermissions.map((permission) => ({
          roleId: roleId,
          claimType: permission.claimType,
          claimValue: permission.claimValue,
          description: permission.description,
          group: permission.group,
          isAssignedToRole: permission.isAssignedToRole,
        })),
      };

      await api.put("/Roles/update-permissions", updatePayload);

      setHasChanges(false);
      // Show success message or handle success state
      console.log("Permissions updated successfully");
    } catch (error) {
      console.error("Error updating permissions:", error);
      // Show error message to user
    } finally {
      setIsSaving(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    // Reload the original data to discard changes
    const getRolePermissions = async () => {
      try {
        const response = await api.get(`/Roles/permissions/${roleId}`);
        setRolePermissions(response?.data.responseData.roleClaims || []);
        setHasChanges(false);
      } catch (error) {
        console.error("Error reloading role permissions:", error);
      }
    };
    getRolePermissions();
  };

  // Handle back to users
  const handleBackToUsers = () => {
    if (hasChanges) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?",
      );
      if (!confirmLeave) return;
    }
    navigate("/system-users"); // Adjust the route as needed
  };

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

  // Extract unique groups/categories from permissions
  const categories = [...new Set(rolePermissions.map((p) => p.group))];

  // Calculate statistics
  const totalPermissions = rolePermissions.length;
  const enabledPermissions = rolePermissions.filter(
    (p) => p.isAssignedToRole,
  ).length;
  const disabledPermissions = totalPermissions - enabledPermissions;

  // Calculate search results count
  const searchResultsCount = filteredPermissions.length;

  return (
    <main className="bg-background min-h-dvh w-full flex-1 p-4 pt-24 sm:p-6 sm:pt-8">
      <div className="mb-6">
        {/* Back Button */}
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/70 mb-4 w-full sm:w-auto"
          iconBeforeText={true}
          icon="fa-solid fa-arrow-left"
          onClick={handleBackToUsers}
        >
          Back to Users
        </Button>

        {/* Header Section */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <FontAwesomeIcon
                icon="fa-solid fa-shield"
                className={cn("text-primary h-6 w-6 sm:h-8 sm:w-8")}
              />
              <h1 className="text-foreground text-xl font-medium sm:text-2xl">
                {roleInfo.name} Permissions
              </h1>
              {hasChanges && (
                <span className="bg-accent text-accent-foreground rounded px-2 py-1 text-xs">
                  Unsaved Changes
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">
              Information on the {roleInfo.description}
            </p>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full justify-center sm:w-auto"
            icon="fa-solid fa-floppy-disk"
            iconBeforeText={true}
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
          <Card className="sm:min-w-0">
            <CardContent className="h-full w-full p-3 sm:p-4">
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Total Permissions
                  </p>
                  <p className="text-primary text-lg sm:text-xl lg:text-2xl">
                    {totalPermissions}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon="fa-solid fa-lock"
                  className="text-primary/30 h-6 w-6 sm:h-8 sm:w-8"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="sm:min-w-0">
            <CardContent className="h-full w-full p-3 sm:p-4">
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Enabled
                  </p>
                  <p className="text-primary text-lg sm:text-xl lg:text-2xl">
                    {enabledPermissions}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon="fa-solid fa-shield"
                  className="text-primary/30 h-6 w-6 sm:h-8 sm:w-8"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="sm:min-w-0">
            <CardContent className="h-full w-full p-3 sm:p-4">
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Disabled
                  </p>
                  <p className="text-muted-foreground text-lg sm:text-xl lg:text-2xl">
                    {disabledPermissions}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon="fa-solid fa-shield"
                  className="text-muted-foreground/30 h-6 w-6 sm:h-8 sm:w-8"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Permissions Card */}
        <Card>
          {/* Title and Description Section */}
          <div className="mb-4 p-4 pb-0 sm:mb-6 sm:p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-card-foreground text-lg font-medium sm:text-xl">
                Manage Permissions
              </h2>
              <p className="text-muted-foreground max-w-2xl text-sm">
                Enable or disable specific permissions for the {roleInfo.name}{" "}
                role
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
                onChange={setSearchQuery}
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform"
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-times"
                    className="h-4 w-4"
                  />
                </button>
              )}
            </div>
          </div>

          <CardContent className="p-4 pt-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="h-auto w-full flex-wrap justify-start gap-1 sm:gap-2">
                <TabsTrigger
                  value="all"
                  className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
                >
                  All ({searchQuery ? searchResultsCount : totalPermissions})
                </TabsTrigger>
                {categories.map((category) => {
                  const categoryCount = searchQuery
                    ? filteredPermissions.filter((p) => p.group === category)
                        .length
                    : rolePermissions.filter((p) => p.group === category)
                        .length;

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
                {/* Search Results Info */}
                {searchQuery && (
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">
                      {searchResultsCount} result
                      {searchResultsCount !== 1 ? "s" : ""} found for "
                      {searchQuery}"
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-medium"
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-times"
                        className="h-3 w-3"
                      />
                      Clear search
                    </button>
                  </div>
                )}

                <div className="space-y-3 sm:space-y-4">
                  {filteredPermissions.length > 0 ? (
                    filteredPermissions.map((permission) => (
                      <div
                        key={permission.claimValue}
                        className="bg-card hover:bg-accent/5 border-border flex flex-col justify-between gap-3 rounded-lg border p-3 transition-colors sm:flex-row sm:items-start sm:gap-4 sm:p-4"
                      >
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
                              permission.isAssignedToRole
                                ? "bg-primary"
                                : "bg-switch-background"
                            }`}
                            onClick={() =>
                              handleTogglePermission(permission.claimValue)
                            }
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
                    ))
                  ) : (
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
                          onClick={() => setSearchQuery("")}
                          className="text-primary hover:text-primary/80 mt-2 text-sm font-medium"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Button
            className="text-foreground outline-primary hover:bg-muted hover:text-muted-foreground w-full justify-center bg-transparent outline-1 sm:w-auto"
            onClick={handleCancel}
            disabled={!hasChanges || isSaving}
          >
            Cancel
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full justify-center sm:w-auto"
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </main>
  );
}

export default RolePermissionsPage;
