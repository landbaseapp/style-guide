import { Icon } from '@phosphor-icons/react';
import { cn } from 'src/utils/tw.utils';
import { cva } from 'class-variance-authority';
import { MouseEventHandler, ReactNode } from 'react';
import { unwrapIcon } from '../Icon';

export type TagVariant =
  | 'default'
  | 'outline'
  | 'info'
  | 'loading'
  | 'positive'
  | 'warning'
  | 'negative'
  | 'brand';

export const tagVariants = cva(
  'w-fit flex items-center justify-center rounded-sm customtext-label-medium cursor-pointer ' +
    'aria-disabled:bg-disabled aria-disabled:text-on-disabled aria-disabled:opacity-50 ' +
    ' cursor-pointer truncate h-[24px] gap-2xs py-2xs px-xs',
  {
    variants: {
      variant: {
        default:
          'bg-primary-container text-on-primary-container hover:bg-primary-container-hover active:bg-primary-container-active',
        loading: 'bg-surface border customborder-gradient-default customtext-gradient-default',
        info: 'bg-info-container text-on-info-container hover:bg-info-container-hover active:bg-info-container-active',
        warning:
          'text-on-accent-container border-on-accent-container bg-warning-container hover:bg-warning-container-hover active:bg-warning-container-active',
        positive:
          'bg-success-container border text-on-success-container border-on-success-container hover:bg-success-container-hover active:bg-success-container-active',
        outline:
          'bg-surface text-on-surface-variant border border-outline hover:bg-surface-hover active:bg-surface-active',
        negative:
          'text-on-error-container border-on-error-container bg-error-container hover:bg-error-container-hover active:bg-error-container-active',
        brand: 'bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export const tagIconVariants = cva('cursor-pointer w-fit flex border-none', {
  variants: {
    variant: {
      default:
        'bg-primary-container text-on-primary-container group-hover:bg-primary-container-hover group-active:bg-primary-container-active',
      loading: 'bg-surface',
      info: 'bg-info-container text-on-info-container group-hover:bg-info-container-hover group-active:bg-info-container-active',
      warning:
        'text-on-accent-container bg-warning-container group-hover:bg-warning-container-hover group-active:bg-warning-container-active',
      positive:
        'bg-success-container border text-on-success-container group-hover:bg-success-container-hover group-active:bg-success-container-active',
      outline:
        'bg-surface text-on-surface-variant border group-hover:bg-surface-hover group-active:bg-surface-active',
      negative:
        'text-on-error-container bg-error-container group-hover:bg-error-container-hover group-active:bg-error-container-active',
      brand:
        'bg-primary text-on-primary group-hover:bg-primary-hover group-active:bg-primary-active',
    },
  },
});

export function Tag({
  label,
  onClick,
  onMouseDown,
  leftIcon,
  variant,
  rightIcon,
  onRightIconClick,
  disabled,
  className,
  labelClassName,
}: {
  label: ReactNode;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  onRightIconClick?: MouseEventHandler<HTMLSpanElement>;
  onMouseDown?: MouseEventHandler<HTMLSpanElement>;
  variant: TagVariant;
  leftIcon?: Icon;
  rightIcon?: Icon;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}) {
  return (
    <span
      aria-disabled={disabled}
      className={cn(
        tagVariants({ variant: variant ?? 'outline' }),
        !disabled && 'group',
        className
      )}
      onClick={disabled || !onClick ? undefined : onClick}
      onMouseDown={onMouseDown}
    >
      {leftIcon && unwrapIcon(leftIcon, 16)}
      {labelClassName ? <span className={cn('truncate', labelClassName)}>{label}</span> : label}
      <span
        onClick={onRightIconClick}
        className={cn(
          tagIconVariants({ variant: variant }),
          disabled ? 'hover:bg-transparent active:bg-transparent' : 'cursor-pointer'
        )}
      >
        {rightIcon && unwrapIcon(rightIcon, 16)}
      </span>
    </span>
  );
}
