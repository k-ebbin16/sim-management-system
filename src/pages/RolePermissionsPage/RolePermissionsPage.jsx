import Button from "../../components/Button";
import Card from "../../components/Card/Card";
import CardContent from "../../components/Card/CardContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../api/axios";
import { cn } from "../../utils/util";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/Tabs";

library.add(fas, far, fab);

function RolePermissionsPage() {
  const { roleId } = useParams();
  const [activeTab, setActiveTab] = useState("all");
  const [roleInfo, setRoleInfo] = useState({ name: "", description: "" });
  const [rolePermissions, setRolePermissions] = useState([]);

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

  // Extract unique groups/categories from permissions
  const categories = [...new Set(rolePermissions.map((p) => p.group))];

  // Filter permissions based on active tab
  const filteredPermissions =
    activeTab === "all"
      ? rolePermissions
      : rolePermissions.filter((p) => p.group === activeTab);

  // Calculate statistics
  const totalPermissions = rolePermissions.length;
  const enabledPermissions = rolePermissions.filter(
    (p) => p.isAssignedToRole,
  ).length;
  const disabledPermissions = totalPermissions - enabledPermissions;

  return (
    <main className="bg-background min-h-dvh w-full flex-1 p-4 pt-20 sm:p-6 sm:pt-6">
      <div className="mb-6">
        {/* Back Button */}
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/70 mb-4 mt-3  w-full sm:w-auto"
          iconBeforeText={true}
          icon="fa-solid fa-arrow-left"
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
            </div>
            <p className="text-muted-foreground text-sm sm:text-base">
              Information on the {roleInfo.description}
            </p>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full justify-center sm:w-auto"
            icon="fa-solid fa-floppy-disk"
            iconBeforeText={true}
          >
            Save Changes
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <Card className="sm:min-w-0">
            <CardContent className="h-full w-full p-3 sm:p-4">
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Total Users
                  </p>
                  <p className="text-primary text-lg sm:text-xl lg:text-2xl">
                    855
                  </p>
                </div>
                <FontAwesomeIcon
                  icon="fa-solid fa-users"
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
          <div className="mb-4 p-4 pb-0 ">
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
          <CardContent className="p-4v pt-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="h-auto w-full flex-wrap justify-start gap-1 sm:gap-2">
                <TabsTrigger
                  value="all"
                  className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
                >
                  All ({totalPermissions})
                </TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
                  >
                    {category} (
                    {rolePermissions.filter((p) => p.group === category).length}
                    )
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeTab} className="mt-4 sm:mt-6">
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
                        No permissions found matching your search
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Button className="text-foreground outline-primary hover:bg-muted hover:text-muted-foreground w-full justify-center bg-transparent outline-1 sm:w-auto">
            Cancel
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full justify-center sm:w-auto"
            // onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </main>
  );
}

export default RolePermissionsPage;
