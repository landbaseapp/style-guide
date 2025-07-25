import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select';
import { Icon } from '@phosphor-icons/react';
import { useRef } from 'react';
import { unwrapIcon } from '../Icon';
import { Typography } from '../Typography/Typography';
import { Skeleton } from '../Skeleton';
import { cn } from 'src/utils/tw.utils';
import { GeneralToolTip } from '../ToolTip';

type SelectOption = {
  label: string;
  value: string;
  icon?: Icon;
  disabled?: boolean;
  tooltip?: string;
};

export function GeneralSelect({
  label,
  error,
  options,
  errorMessage,
  placeholder,
  value,
  isLoading,
  onChange,
  className,
  id,
}: {
  label: string;
  error?: boolean;
  options: SelectOption[];
  onChange: (newValue: string) => void;
  placeholder?: string;
  errorMessage?: string;
  isLoading?: boolean;
  value?: string;
  className?: string;
  id?: string;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  if (isLoading) {
    return (
      <div className={cn('flex flex-col gap-2xs', className)}>
        {label && (
          <Typography variant="label-medium" className="text-on-surface-variant">
            {label}
          </Typography>
        )}
        <Skeleton className="w-full h-[40px]" />
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-2xs', className)}>
      {label && (
        <Typography variant="label-medium" className="text-on-surface-variant" id={id}>
          {label}
        </Typography>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger error={error} ref={triggerRef} id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent triggerRef={triggerRef}>
          {options.map((option) =>
            option.disabled && option.tooltip ? (
              <GeneralToolTip key={option.value} title={option.tooltip}>
                <div>
                  <SelectItem
                    value={option.value}
                    icon={option.icon ? unwrapIcon(option.icon) : undefined}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                </div>
              </GeneralToolTip>
            ) : (
              <SelectItem
                key={option.value}
                value={option.value}
                icon={option.icon ? unwrapIcon(option.icon) : undefined}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
      {error && (
        <Typography variant="label-small" className="mt-xs mx-sm text-error">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
}
