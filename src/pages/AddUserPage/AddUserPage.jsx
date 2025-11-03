import AddUserHeader from "./AddUserHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddUserPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [roleInfo, setRoleInfo] = useState({ name: "", description: "" });
  const [rolePermissions, setRolePermissions] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
      console.log("Permissions updated successfully");
    } catch (error) {
      console.error("Error updating permissions:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
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
    navigate("/system-users");
  };

  return (
    <main className="bg-background min-h-dvh w-full flex-1 p-4 pt-24 sm:p-6 sm:pt-8">
      <div className="mb-6">
        <AddUserHeader
          hasChanges={hasChanges}
          isSaving={isSaving}
          onBack={handleBackToUsers}
          onSave={handleSave}
        />
      </div>
    </main>
  );
}

export default AddUserPage;
