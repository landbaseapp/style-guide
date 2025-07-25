import * as React from 'react';
import { cn } from 'src/utils/tw.utils';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

const textSizes = {
  lg: 'customtext-label-large',
  md: 'customtext-label-medium',
  sm: 'customtext-label-small',
} as const;

export interface LinkProps extends Omit<RouterLinkProps, 'to'> {
  size?: keyof typeof textSizes;
  disabled?: boolean;
  to?: RouterLinkProps['to'];
}

export const Link: React.FC<LinkProps> = ({
  size = 'md',
  to = '#',
  children,
  className,
  target,
  disabled = false,
  ...props
}) => {
  return (
    <RouterLink
      to={to}
      target={target}
      aria-disabled={disabled}
      className={cn(
        textSizes[size],
        'text-primary hover:text-primary-hover active:text-primary-active focus:text-primary-active cursor-pointer',
        'hover:underline active:underline focus:underline transition-colors',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none text-disabled',
        className
      )}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

Link.displayName = 'Link';
