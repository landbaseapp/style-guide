import { Pencil } from '@phosphor-icons/react';
import { Button, LoadingButton } from '../Button';

interface EditButtonsProps {
  editable: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  onEdit?: () => void;
  isSubmitLoading?: boolean;
}

export const EditButtons = ({
  onEdit,
  editable,
  onCancel,
  onSubmit,
  isSubmitLoading = false,
}: EditButtonsProps) => {
  if (editable) {
    return (
      <div className="flex gap-2xs">
        <Button variant="ghost" type="button" onClick={onCancel}>
          Cancel
        </Button>

        <div className="flex items-center justify-between">
          <LoadingButton
            type="submit"
            variant="accent"
            onClick={onSubmit}
            disabled={isSubmitLoading}
            loading={isSubmitLoading}
          >
            Save changes
          </LoadingButton>
        </div>
      </div>
    );
  }

  return (
    <Button variant="ghost" onClick={onEdit} leftIcon={Pencil}>
      Edit
    </Button>
  );
};
