import { Icon } from '@phosphor-icons/react';
import * as React from 'react';
import { cn } from 'src/utils/tw.utils';
import { unwrapIcon } from '../Icon';

export interface ToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  icon?: Icon;
  size?: keyof typeof toggleButtonSize;
  children?: React.ReactNode;
}

const toggleButtonSize = {
  xs: 'w-[24px] h-[24px] px-xs',
  sm: 'w-[32px] h-[32px] px-xs',
  md: 'w-[40px] h-[40px] px-xs',
} as const;

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  size = 'md',
  selected = false,
  icon,
  ...props
}) => {
  return (
    <button
      className={cn(
        'flex items-center transition-all cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed border-0',
        selected
          ? 'text-on-selected bg-selected hover:bg-selected-hover active:bg-selected-active focus:bg-selected-active disabled:bg-disabled disabled:text-on-disabled'
          : 'text-on-surface-variant bg-ghost active:bg-ghost-active focus:bg-ghost-active disabled:text-disabled',
        toggleButtonSize[size],
        'rounded-full'
      )}
      aria-pressed={selected}
      {...props}
    >
      {icon && unwrapIcon(icon, size === 'xs' ? 12 : size === 'sm' ? 16 : 24)}
    </button>
  );
};
