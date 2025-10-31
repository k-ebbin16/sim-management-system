import { useContext, useEffect, useState } from "react";

import Avatar from "../../components/Avatar/Avatar";
import { BaseTable } from "../../components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatusBadge from "../../components/StatusBadge";
import UsersDataContext from "../../context/UsersDataContext";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas, far, fab);

const AllUsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getUsers, users } = useContext(UsersDataContext);

  const columns = [
    {
      key: "displayName",
      header: "User",
      searchable: true,
      minWidth: "250px",
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar name={user.displayName} size="sm" className="flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-card-foreground text-md truncate font-medium">
              {user.displayName || "N/A"}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      searchable: true,
      truncate: false,
      fallback: "N/A",
      minWidth: "200px",
      render: (user) => (
        <div className="text-card-foreground text-sm">
          {user.email || "N/A"}
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      searchable: false,
      minWidth: "120px",
      render: (user) => (
        <StatusBadge
          status={user.isActive}
          variant="primary"
          activeText="Active"
          inactiveText="Inactive"
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      searchable: false,
      minWidth: "120px",
      render: (user) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleEdit(user)}
            className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg p-2 transition-colors"
            title="Edit user"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-pen-to-square "
              className="text-sm"
            />
          </button>
          <button
            onClick={() => handleDelete(user)}
            className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 rounded-lg p-2 transition-colors"
            title="Delete user"
          >
            <FontAwesomeIcon icon="fa-solid fa-trash " className="text-sm" />
          </button>
        </div>
      ),
    },
  ];

  const getUsersData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getUsers();

      if (result.isSuccessful) {
        setError(null);
      } else {
        setError(result.message || "Failed to fetch users");
      }
    } catch (err) {
      console.error("Error in getUsersData:", err);
      setError("An error occurred while fetching users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddUser = () => {
    console.log("Add user button clicked");
  };

  const handleEdit = (user) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (user) => {
    console.log("Delete user:", user);
  };

  const handleRetry = () => {
    getUsersData(true);
  };

  const handleRefresh = () => {
    getUsersData(true);
  };

  return (
    <BaseTable
      columns={columns}
      data={users}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search users by name or email..."
      onAdd={handleAddUser}
      onRefresh={handleRefresh}
      addButtonText="Add User"
      refreshButtonText="Refresh"
      title="User Management"
      description="Manage user accounts, permissions, and access levels across the system."
      isLoading={isLoading}
      error={error}
      onRetry={handleRetry}
      showSearch={true}
      showAddButton={true}
      showRefreshButton={true}
    />
  );
};

export default AllUsersTable;
