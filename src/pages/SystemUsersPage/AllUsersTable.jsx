import { useContext, useState, useEffect } from "react";
import UsersDataContext from "../../context/UsersDataContext";
import { BaseTable } from "../../components/Table";
import StatusBadge from "../../components/StatusBadge";
import Avatar from "../../components/Avatar/Avatar";

const AllUsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getUsers, users } = useContext(UsersDataContext);

  // Define columns configuration with mobile-friendly widths
  const columns = [
    {
      key: "displayName",
      header: "User",
      searchable: true,
      minWidth: "250px",
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar
            name={user.displayName}
            size="sm"
            fallbackBackground="bg-primary"
            fallbackTextColor="text-primary-foreground"
            className="flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="text-card-foreground truncate text-md font-medium">
              {user.displayName || "N/A"}
            </div>
            {/* <div className="text-muted-foreground truncate text-sm">
              {user.email || "N/A"}
            </div> */}
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
            <i className="fa-solid fa-pen-to-square text-base"></i>
          </button>
          <button
            onClick={() => handleDelete(user)}
            className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 rounded-lg p-2 transition-colors"
            title="Delete user"
          >
            <i className="fa-solid fa-trash text-base"></i>
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
    getUsersData();
  };

  return (
    <BaseTable
      columns={columns}
      data={users}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search users by name or email..."
      onAdd={handleAddUser}
      addButtonText="Add User"
      title="User Management"
      description="Manage user accounts, permissions, and access levels across the system."
      isLoading={isLoading}
      error={error}
      onRetry={handleRetry}
      showSearch={true}
      showAddButton={true}
    />
  );
};

export default AllUsersTable;
