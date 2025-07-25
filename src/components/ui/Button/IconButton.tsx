import * as React from 'react';
import { cn } from 'src/utils/tw.utils';
import { Icon } from '@phosphor-icons/react';
import { unwrapIcon } from '../Icon';
import { cva, VariantProps } from 'class-variance-authority';

export const iconButtonVariants = cva(
  `inline-flex items-center justify-center rounded-full transition-colors cursor-pointer
  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
  disabled:pointer-events-none border-0`,
  {
    variants: {
      variant: {
        ghost: `bg-ghost text-on-surface-variant 
          hover:bg-ghost-hover active:bg-ghost-active focus:bg-ghost-active 
          hover:border-ghost-hover active:border-ghost-active focus:border-ghost-active
          disabled:bg-ghost disabled:text-disabled/50`,
        primary: `bg-primary text-on-primary 
          hover:bg-primary-hover active:bg-primary-active 
          disabled:bg-disabled disabled:text-on-disabled/50`,
        accent: `bg-accent text-accent-foreground 
          hover:bg-accent-hover active:bg-accent-active focus:bg-accent-active
          disabled:bg-disabled disabled:text-on-disabled/50`,
        danger: `bg-error-container text-on-error-container 
          hover:bg-error-container-hover active:bg-error-container-active focus:bg-error-container-active 
          disabled:bg-disabled disabled:text-on-disabled/50`,
      },
      size: {
        md: 'h-[40px] w-[40px] p-0',
        sm: 'h-[32px] w-[32px] p-0',
        xs: 'h-[24px] w-[24px] p-0',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: Icon;
  type?: 'button' | 'submit' | 'reset';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      size = 'md',
      className,
      variant = 'ghost',
      onClick,
      onMouseDown,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      e.currentTarget.blur();
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseDown?.(e);
      e.currentTarget.blur();
    };

    return (
      <button
        ref={ref}
        {...props}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        className={cn(iconButtonVariants({ size, variant }), className)}
        type={type}
      >
        {unwrapIcon(icon, size === 'md' ? 24 : size === 'sm' ? 16 : 12)}
      </button>
    );
  }
);
IconButton.displayName = 'IconButton';
