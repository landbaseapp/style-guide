import {
  Control,
  useFieldArray,
  Controller,
  FieldValues,
  ArrayPath,
  Path,
  FieldArray,
} from 'react-hook-form';
import { Button, IconButton } from 'src/components/ui/Button';
import { LabelInput, LabelTextarea } from 'src/components/ui/Input';
import { Trash, Plus } from '@phosphor-icons/react';
import { cn } from 'src/utils/tw.utils';

interface FormTextFieldArrayProps<T extends FieldValues> {
  control: Control<T>;
  name: ArrayPath<T>;
  label: string;
  minFieldsCount?: number;
  halfWidth?: boolean;
  multiline?: boolean;
  textFieldProps?: {
    rows?: number;
    placeholder?: string;
  };
}

export const FormTextFieldArray = <T extends FieldValues>({
  control,
  name,
  label,
  minFieldsCount = 1,
  halfWidth = false,
  multiline = false,
  textFieldProps,
}: FormTextFieldArrayProps<T>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const InputComponent = multiline ? LabelTextarea : LabelInput;

  return (
    <div className="flex flex-col gap-xs w-full">
      <div className="flex flex-wrap gap-md">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={cn(
              halfWidth ? 'w-[calc(50%-8px)]' : 'w-full',
              !halfWidth && 'mb-sm last:mb-0'
            )}
          >
            <Controller
              control={control}
              name={`${name}.${index}.value` as Path<T>}
              render={({ field, fieldState }) => {
                return (
                  <div
                    className={cn(
                      'flex gap-xs w-full',
                      fieldState.error ? 'items-center' : 'items-end'
                    )}
                  >
                    <div className="flex-1 w-full">
                      <InputComponent
                        {...field}
                        {...textFieldProps}
                        className="w-full"
                        label={`${label} ${index + 1} ${
                          index + 1 > minFieldsCount ? '(Optional)' : ''
                        }`}
                        error={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                        preventEnter={multiline ? undefined : true}
                      />
                    </div>
                    <IconButton
                      variant="ghost"
                      disabled={fields.length <= minFieldsCount}
                      onClick={() => remove(index)}
                      icon={Trash}
                    />
                  </div>
                );
              }}
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="ghost"
        leftIcon={Plus}
        onClick={() => {
          append({ value: '' } as FieldArray<T, typeof name>);
        }}
        className="self-start"
      >
        Add more
      </Button>
    </div>
  );
};
