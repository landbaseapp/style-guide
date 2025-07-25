import * as React from 'react';
import { Icon, IconProps } from '@phosphor-icons/react';
import upperFirst from 'lodash/upperFirst';
import { cn } from 'src/utils/tw.utils';
import { unwrapIcon } from '../Icon';

export type BadgeVariant = 'default' | 'brand' | 'positive' | 'negative' | 'warning' | 'info';

const formatLabel = (label: string, isCapitalized: boolean) => {
  return isCapitalized ? upperFirst(label.toLowerCase()) : label;
};

const variants: { [key in BadgeVariant]: string } = {
  default: 'bg-surface-container text-on-surface-muted border-outline',
  brand: 'text-on-primary-container border-primary bg-primary-container',
  positive: 'text-on-success-container border-on-success-container bg-success-container',
  negative: 'text-on-error-container border-on-error-container bg-error-container',
  warning: 'text-on-accent-container border-on-accent-container bg-warning-container',
  info: 'text-on-info-container border-on-info-container bg-info-container',
} as const;

type Dot = 'dot';

export interface BadgeProps {
  className?: string;
  variant?: BadgeVariant;
  leftIcon?: Icon | Dot;
  rightIcon?: Icon;
  leftIconProps?: IconProps;
  rightIconProps?: IconProps;
  label?: string;
  ref?: React.RefObject<HTMLSpanElement>;
  isCapitalized?: boolean;

  /**
   * textBadge is used when it is a badge with a text content only in it,
   * and it has a limited width so that text is getting truncated with ... at the end.
   * I added textBadge param cz I haven't check with the other badge content and afraid to brake anything.
   * But maybe this styles can be applied for any content type, in this case we can remove textBadge param.
   * This is out of scope of current task, so leaving a todo item.
   * TODO(artsiom): check all possible badge content cases and remove textBadge param.
   */
  textBadge?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  rightIcon,
  leftIcon,
  leftIconProps,
  rightIconProps,
  className,
  ref,
  textBadge,
  isCapitalized = true,
}) => {
  const isIconOnly = !label && (leftIcon || rightIcon);

  return (
    <span
      ref={ref}
      className={cn(
        'rounded-full customtext-label-medium',
        'h-[20px] border gap-2xs truncate cursor-default',
        textBadge ? '' : 'flex w-fit items-center justify-center',
        isIconOnly ? 'p-2xs aspect-square' : 'px-xs',
        isIconOnly || textBadge ? '' : 'py-2xs',
        variants[variant],
        className
      )}
    >
      {leftIcon &&
        (leftIcon === 'dot' ? (
          <span className={cn('inline-block w-[4px] h-[4px] rounded-full bg-current')} />
        ) : (
          unwrapIcon(leftIcon, 16, leftIconProps)
        ))}
      {label && formatLabel(label, isCapitalized)}
      {rightIcon && unwrapIcon(rightIcon, 16, rightIconProps)}
    </span>
  );
};
