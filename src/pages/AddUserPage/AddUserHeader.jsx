import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../../utils/util";

function AddUserHeader({ hasChanges, isSaving, onBack, onSave }) {
  return (
    <>
      {/* Back Button */}
      <Button
        className="bg-accent text-accent-foreground hover:bg-accent/70 mb-4 w-full sm:w-auto"
        iconBeforeText={true}
        icon="fa-solid fa-arrow-left"
        onClick={onBack}
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
            {hasChanges && (
              <span className="bg-accent text-accent-foreground rounded px-2 py-1 text-xs">
                Unsaved Changes
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            Create a new system user account
          </p>
        </div>

        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full justify-center sm:w-auto"
          icon="fa-solid fa-floppy-disk"
          iconBeforeText={true}
          onClick={onSave}
          disabled={!hasChanges || isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </>
  );
}

export default AddUserHeader;
