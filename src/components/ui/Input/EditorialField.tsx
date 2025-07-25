import { FieldLabel } from './FieldLabel';
import { LabelInput, LabelInputProps } from './Input';
import { LabelTextarea, LabelTextareaProps } from './Textarea';

interface EditableFieldProps {
  editable?: boolean;
  value?: string | React.ReactNode;
  formProps: LabelInputProps | LabelTextareaProps;
  multiline?: boolean;
}

export const EditableField = ({
  editable = true,
  value,
  formProps,
  multiline = false,
}: EditableFieldProps) => {
  const { label } = formProps;
  if (editable) {
    return multiline ? (
      <LabelTextarea {...(formProps as LabelTextareaProps)} />
    ) : (
      <LabelInput {...(formProps as LabelInputProps)} preventEnter />
    );
  }
  return <FieldLabel label={label ?? ''} value={value} />;
};
