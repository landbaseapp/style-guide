import { ChangeEvent } from 'react';
import { FieldLabel, Input, InputProps, LabelInput } from 'src/components/ui/Input';

interface PhoneNumberInputProps {
  editable: boolean;
  error?: boolean;
  placeholder?: string;
  inputProps?: Partial<InputProps> & { label?: string };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  errorMessage?: string;
}

export const PhoneNumberInput = ({
  editable,
  value,
  error = false,
  placeholder,
  inputProps,
  onChange,
  disabled = false,
  errorMessage,
}: PhoneNumberInputProps) => {
  const { label = '' } = inputProps ?? {};
  const Comp = label ? LabelInput : Input;

  if (editable) {
    return (
      <Comp
        placeholder={placeholder}
        error={error}
        onChange={onChange}
        value={value}
        disabled={disabled}
        inputMode="numeric"
        pattern="[0-9]*"
        {...inputProps}
        label={label}
        errorMessage={errorMessage}
        preventEnter
      />
    );
  }

  return <FieldLabel label={label} value={value} />;
};
