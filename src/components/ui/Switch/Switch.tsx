import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { Check, CircleNotch, X } from '@phosphor-icons/react';
import { cn } from 'src/utils/tw.utils';
import { Typography } from '../Typography';

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  className?: string;
  icon?: boolean;
  label?: string;
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
  loading?: boolean;
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  (
    { className, icon, label, checked: controlledChecked, onCheckedChange, loading, ...props },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(false);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    const handleCheckedChange = (value: boolean) => {
      if (!isControlled) {
        setUncontrolledChecked(value);
      }
      onCheckedChange?.(value);
    };

    return (
      <div className="flex items-center gap-xs">
        <SwitchPrimitives.Root
          className={cn(
            'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full transition-colors relative border-[1px]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',

            // Checked state
            'data-[state=checked]:bg-primary data-[state=checked]:border-primary',
            'data-[state=checked]:hover:bg-primary-hover',
            'data-[state=checked]:active:bg-primary-active',
            'data-[state=checked]:focus:bg-primary-active',

            // Unchecked state
            'data-[state=unchecked]:bg-surface data-[state=unchecked]:border-outline-variant',
            'data-[state=unchecked]:hover:bg-surface-hover',
            'data-[state=unchecked]:active:bg-surface-active',
            'data-[state=unchecked]:focus:bg-surface-active',
            className
          )}
          checked={checked}
          onCheckedChange={handleCheckedChange}
          {...props}
          ref={ref}
        >
          <SwitchPrimitives.Thumb
            className={cn(
              'pointer-events-none block h-[18px] w-[18px] rounded-full transition-transform border-none',
              checked
                ? 'bg-surface-container translate-x-[17px]'
                : 'bg-surface-inverse translate-x-[-4px]',
              'flex items-center justify-center'
            )}
            aria-checked={checked}
          >
            {icon && loading && (
              <CircleNotch size={12} className="animate-spin text-on-surface-variant" />
            )}
            {icon && !loading && (
              <>
                {checked ? (
                  <Check size={12} className="text-primary" />
                ) : (
                  <X size={12} className="text-on-surface-inverse" />
                )}
              </>
            )}
          </SwitchPrimitives.Thumb>
        </SwitchPrimitives.Root>
        {label && (
          <Typography variant="label-large" className="text-on-surface-muted">
            {label}
          </Typography>
        )}
      </div>
    );
  }
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
