import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { cn } from 'src/utils/tw.utils';
import { buttonVariants } from './Button';
import { Icon } from '@phosphor-icons/react';
import { unwrapIcon } from '../Icon';
import { Loading } from '../Loading';

export interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  icon?: Icon;
  rightIcon?: Icon;
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      rightIcon,
      children,
      asChild = false,
      loading = false,
      type = 'submit',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant: variant, size, className }),
          loading && 'cursor-not-allowed'
        )}
        ref={ref}
        type={type}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loading size={16} />
        ) : (
          <>
            {icon && <div className="mr-[10px]">{unwrapIcon(icon, size === 'sm' ? 12 : 16)}</div>}
            {children}
            {rightIcon && (
              <div className="ml-[10px]">{unwrapIcon(rightIcon, size === 'sm' ? 12 : 16)}</div>
            )}
          </>
        )}
      </Comp>
    );
  }
);

LoadingButton.displayName = 'LoadingButton';
