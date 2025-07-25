import { cn } from 'src/utils/tw.utils';

interface Option<T> {
  value: T;
  label: string;
}

export interface SegmentPickerProps<T extends string> {
  options: Option<T>[];
  value: T;
  onClick: (value: T) => void;
  className?: string;
  disabled?: boolean;
}

export const SegmentPicker = <T extends string>({
  options,
  value,
  onClick,
  className,
  disabled,
}: SegmentPickerProps<T>) => {
  const optionWidth = `${100 / options.length}%`;

  return (
    <div
      className={cn(
        'h-[32px] w-full inline-flex rounded-[6px] bg-surface-container-high border-none p-[2px]',
        className
      )}
      role="tablist"
      aria-orientation="horizontal"
    >
      {options.map((option) => (
        <button
          type="button"
          disabled={disabled}
          key={option.value}
          onClick={() => onClick(option.value)}
          style={{ width: optionWidth }}
          className={cn(
            'h-auto rounded-sm p-sm border-none cursor-pointer customtext-label-large flex items-center justify-center',
            option.value === value
              ? 'bg-surface text-on-surface shadow-drop-sm'
              : 'text-on-surface-muted',
            disabled && 'opacity-50 text-disabled'
          )}
          role="tab"
          aria-selected={option.value === value}
        >
          <span className="truncate whitespace-nowrap overflow-hidden text-center">
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
};
