import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from 'src/utils/tw.utils';
import { Check, Minus } from '@phosphor-icons/react';
import { Typography, TypographyProps } from '../Typography/Typography';

function getSize(customSize?: number, label?: string | React.ReactNode) {
  return customSize || (label ? 24 : 40);
}

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  className?: string;
  padding?: string;
  labelClassName?: string;
  labelVariant?: TypographyProps['variant'];
  size?: number;
  checked?: boolean | 'indeterminate';
  disabled?: boolean;
  label?: string | React.ReactNode;
  error?: boolean;
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  (
    {
      className,
      labelClassName,
      size,
      checked,
      disabled,
      label,
      error,
      padding = 'p-sm',
      labelVariant = 'label-large',
      ...props
    },
    ref
  ) => (
    <div className="flex items-center gap-xs">
      <div
        className={cn(
          'rounded-full',
          `flex w-[${getSize(size, label)}px]`,
          `h-[${getSize(size, label)}px]`,
          'items-center',
          'justify-center',
          padding
        )}
      >
        <CheckboxPrimitive.Root
          ref={ref}
          checked={checked}
          className={cn(
            'flex items-center justify-center peer h-[16px] w-[16px] shrink-0 rounded-sm border border-primary',
            'bg-surface hover:bg-surface-hover active:bg-surface-active',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-50',
            // error
            error && 'border-error',
            'data-[state=checked]:bg-primary data-[state=checked]:text-on-primary',
            'data-[state=checked]:hover:bg-primary-hover data-[state=checked]:active:bg-primary-active',
            'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-on-primary',
            'data-[state=indeterminate]:hover:bg-primary-hover data-[state=indeterminate]:active:bg-primary-active',
            className
          )}
          disabled={disabled}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            className={cn('flex items-center justify-center text-current')}
          >
            {checked === 'indeterminate' ? <Minus size={16} /> : <Check size={16} />}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      </div>
      {label && typeof label === 'string' ? (
        <Typography variant={labelVariant} className={labelClassName}>
          {label}
        </Typography>
      ) : (
        label
      )}
    </div>
  )
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
