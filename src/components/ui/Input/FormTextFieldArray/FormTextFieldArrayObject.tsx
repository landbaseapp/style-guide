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
import { Typography } from 'src/components/ui/Typography';
import { Card } from 'src/components/ui/Card';
import { Trash, Plus } from '@phosphor-icons/react';

interface FormTextFieldArrayObjectProps<T extends FieldValues> {
  control: Control<T>;
  name: ArrayPath<T>;
  label: string;
  minFieldsCount?: number;
  halfWidth?: boolean;
  objectFields: {
    label: string;
    name: string;
    multiline?: boolean;
    textFieldProps?: {
      rows?: number;
      minRows?: number;
      placeholder?: string;
    };
  }[];
}

export const FormTextFieldArrayObject = <T extends FieldValues>({
  control,
  name,
  minFieldsCount = 1,
  halfWidth,
  label,
  objectFields,
}: FormTextFieldArrayObjectProps<T>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="flex flex-col gap-xs px-xs w-full">
      <div className={`w-full ${halfWidth ? 'flex flex-wrap gap-md' : ''}`}>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={`flex items-center gap-xs 
              ${halfWidth ? 'w-[calc(50%-8px)]' : 'w-full mb-sm last:mb-0'}`}
          >
            <Card className="flex-grow p-md flex flex-col gap-xs">
              <Typography variant="title-medium">
                {label} {index + 1}
              </Typography>
              {objectFields.map(({ label, name: fieldName, multiline, textFieldProps }) => {
                const InputComponent = multiline ? LabelTextarea : LabelInput;
                return (
                  <Controller
                    key={fieldName}
                    control={control}
                    name={`${name}.${index}.${fieldName}` as Path<T>}
                    render={({ field, fieldState }) => (
                      <InputComponent
                        {...field}
                        {...textFieldProps}
                        preventEnter={multiline ? undefined : true}
                        className="w-full"
                        label={label}
                        error={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />
                );
              })}
            </Card>
            <IconButton
              variant="ghost"
              disabled={fields.length <= minFieldsCount}
              onClick={() => remove(index)}
              icon={Trash}
            />
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        leftIcon={Plus}
        onClick={(e) => {
          e.preventDefault();
          append({} as FieldArray<T, typeof name>);
        }}
        className="self-start"
      >
        Add more
      </Button>
    </div>
  );
};
