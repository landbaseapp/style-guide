import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from 'src/utils/tw.utils';
import { Typography } from '../Typography/Typography';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    className?: string;
  }
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root {...props} className={cn('grid gap-xs', className)} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    className?: string;
    label?: string;
    disabled?: boolean;
  }
>(({ className, label, disabled, ...props }, ref) => {
  return (
    <div className="flex items-center gap-xs text-on-surface-variant disabled:text-on-surface-variant/50">
      <RadioGroupPrimitive.Item
        {...props}
        ref={ref}
        className={cn(
          'aspect-square h-[18px] w-[18px] rounded-full border border-primary text-primary',
          'focus:outline-none focus-visible:outline-1 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50',
          'text-on-surface',
          className
        )}
        disabled={disabled}
      >
        <RadioGroupPrimitive.Indicator className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[12px] w-[12px] rounded-full bg-primary" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {label && <Typography variant="label-large">{label}</Typography>}
    </div>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
