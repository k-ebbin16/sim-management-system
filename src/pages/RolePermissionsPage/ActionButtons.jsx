import Button from "../../components/Button";

function ActionButtons({ hasChanges, isSaving, onCancel, onSave }) {
  return (
    <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">
      <Button
        className="text-foreground outline-primary hover:bg-muted hover:text-muted-foreground w-full justify-center bg-transparent outline-1 sm:w-auto"
        onClick={onCancel}
        disabled={!hasChanges || isSaving}
      >
        Cancel
      </Button>
      <Button
        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full justify-center sm:w-auto"
        onClick={onSave}
        disabled={!hasChanges || isSaving}
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}

export default ActionButtons;
