import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../../utils/util";
import { useNavigate } from "react-router-dom";

function AddUserHeader() {
  const navigate = useNavigate();
    const handleBackToUsers = () => {
      navigate("/system-users");
    };

  return (
    <div>
      {/* Back Button */}
      <Button
        className="bg-accent text-accent-foreground hover:bg-accent/70 mb-8 w-full sm:w-auto"
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
              icon="fa-solid fa-user-plus"
              className={cn("text-primary text-2xl sm:text-3xl")}
            />
            <h1 className="text-foreground text-xl font-medium sm:text-2xl">
              Add New User
            </h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Create a new system user account
          </p>
        </div>

        
      </div>
    </div>
  );
}

export default AddUserHeader;
