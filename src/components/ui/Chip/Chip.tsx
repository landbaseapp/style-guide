import { XCircle } from '@phosphor-icons/react';
import { cn } from 'src/utils/tw.utils';
import { IconButton } from '../Button';
import { cva } from 'class-variance-authority';

export const chipVariants = cva(
  'flex items-center justify-center rounded-xs customtext-label-medium cursor-pointer ' +
    'aria-disabled:bg-disabled aria-disabled:text-on-disabled aria-disabled:opacity-50 ' +
    ' truncate',
  {
    variants: {
      variant: {
        default: 'bg-primary-container text-on-primary-container',
      },
      size: { sm: 'cursor-pointer h-[24px] gap-2xs py-2xs pl-xs pr-0' },
    },
    defaultVariants: { variant: 'default', size: 'sm' },
  }
);

// We only have one Chip style for now, adding more later
export function RemoveChip({
  label,
  onClick,
  disabled,
  variant = 'default',
  size = 'sm',
}: {
  label: string;
  onClick?: () => void;
  variant: 'default';
  size: 'sm';
  disabled?: boolean;
}) {
  return (
    <span
      aria-disabled={disabled}
      className={cn(chipVariants({ variant, size }))}
      onMouseDown={onClick}
    >
      <span className="truncate max-w-[180px]">{label}</span>
      {onClick ? (
        <IconButton disabled={disabled} variant="ghost" icon={XCircle} size="xs" />
      ) : (
        // artificial space to keep the layout consistent
        <div className="pl-2xs" />
      )}
    </span>
  );
}
