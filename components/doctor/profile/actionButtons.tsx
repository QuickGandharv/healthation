import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
  fullWidthEdit?: boolean;
  /**
   * When true, render only the delete button (hide edit).
   * Used by sections like address where edit is not applicable.
   */
  deleteOnlyIcon?: boolean;
}

export function ActionButtons({
  onEdit,
  onDelete,
  showDelete = true,
  fullWidthEdit = false,
  deleteOnlyIcon = false,
}: ActionButtonsProps) {
  const showEdit = !deleteOnlyIcon;

  return (
    <div className="flex gap-2 mt-4">
      {showEdit && (
        <Button
          variant="outline"
          size="sm"
          className={fullWidthEdit ? "flex-1" : ""}
          onClick={onEdit}
        >
          <Edit className="h-3 w-3 mr-1" />
          Edit
        </Button>
      )}

      {showDelete && (
        <Button
          variant="outline"
          size="sm"
          className={fullWidthEdit && deleteOnlyIcon ? "flex-1" : ""}
          onClick={onDelete}
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Delete
        </Button>
      )}
    </div>
  );
}