import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, CaretDown, CaretUp } from '@phosphor-icons/react';

import { cn } from 'src/utils/tw.utils';
import { inputStyling } from '../Input';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

/**
 * SelectTrigger: The button that opens the dropdown menu
 */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, 'ref'> & {
    className?: string;
    error?: boolean;
    triggerRef?: React.RefObject<HTMLButtonElement>;
    arrow?: boolean;
  }
>(({ className, children, error = false, arrow = true, triggerRef, ...props }, ref) => {
  const internalRef = React.useRef<HTMLButtonElement | null>(null);
  React.useImperativeHandle(ref, () => internalRef.current as HTMLButtonElement);

  return (
    <SelectPrimitive.Trigger
      ref={(node) => {
        internalRef.current = node;
        if (triggerRef && 'current' in triggerRef) {
          (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      }}
      className={inputStyling({
        className: cn(className, 'justify-between items-center'),
        error,
        addPadding: false,
      })}
      {...props}
    >
      <span className="w-full text-left truncate min-w-0">{children}</span>
      {arrow && (
        <SelectPrimitive.Icon asChild>
          <CaretDown size={16} />
        </SelectPrimitive.Icon>
      )}
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 * SelectContent: The dropdown menu that appears when the SelectTrigger is clicked
 */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>, 'ref'> & {
    className?: string;
    position?: 'popper' | 'item-aligned';
    triggerRef?: React.RefObject<HTMLButtonElement>;
  }
>(({ className, children, position = 'popper', triggerRef, ...props }, ref) => {
  const [triggerWidth, setTriggerWidth] = React.useState<number | null>(null);

  // Dynamically update the dropdown width to match the trigger width
  React.useEffect(() => {
    if (!triggerRef?.current) return;

    const updateWidth = () => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth);
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(triggerRef.current);

    return () => observer.disconnect(); // Cleanup
  }, [triggerRef]);

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          // Base Positioning
          `relative z-[1202] max-h-[24rem] overflow-hidden`,
          // Layout
          `flex flex-col gap-2xs rounded-md`,
          // Border and Container Colors
          `border border-outline-variant bg-surface-container text-on-surface-variant shadow-md p-2xs`,
          // Opening/Closing Fade animations
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          // Scaling animations
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          // Slide-in animations by position
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        // Dynamically update the dropdown width to match the trigger width
        style={{
          width: triggerWidth ? `${triggerWidth}px` : 'auto',
        }}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className="w-full">{children}</SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const selectItemStyling = (selected: boolean) => {
  return cn(
    // Base styles
    `relative cursor-default select-none outline-none`,
    // Layout and Typography
    `m-2xs rounded-sm customtext-label-large overflow-hidden`,
    // Disabled state
    'outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 disabled:opacity-50 rounded-sm overflow-clip',
    // Interactive states and colors
    selected
      ? 'bg-selected text-on-selected hover:bg-selected-hover focus:bg-selected-active active:bg-selected-active disabled:bg-disabled disabled:text-on-disabled data-[disabled]:bg-disabled data-[disabled]:text-on-disabled'
      : 'text-on-surface-variant bg-ghost hover:bg-ghost-hover active:bg-ghost-active focus:bg-ghost-active disabled:text-disabled data-[disabled]:text-disabled'
  );
};
/**
 * SelectItem: An individual item in the dropdown menu
 */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    className?: string;
    selected?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    children?: React.ReactNode;
  }
>(({ className, children, selected = false, disabled = false, icon, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    disabled={disabled}
    className={cn(selectItemStyling(selected), className)}
    {...props}
  >
    {/* Main container - handles overall layout and spacing */}
    <div className="relative flex flex-row items-center justify-between py-xs px-md customtext-label-large">
      {/* Left content container - handles icon and text with overflow protection */}
      <div className="flex items-center gap-xs min-w-0 w-full overflow-hidden">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <SelectPrimitive.ItemText className="truncate max-w-full">
          {children}
        </SelectPrimitive.ItemText>
      </div>
      {selected && (
        <span className="flex items-center justify-center flex-shrink-0">
          <Check size={16} />
        </span>
      )}
    </div>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

/**
 * SelectItem That does not have to be in <SelectContent>
 */
const StandaloneSelectItem = React.forwardRef<
  React.ElementRef<'button'>,
  React.ComponentPropsWithoutRef<'button'> & {
    className?: string;
    py?: string;
    px?: string;
    selected?: boolean;
    showSelectedIcon?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    multiline?: boolean;
  }
>(
  (
    {
      className,
      children,
      py = 'xs',
      px = 'md',
      selected = false,
      showSelectedIcon = true,
      disabled = false,
      icon,
      onClick,
      multiline = false,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      className={cn(selectItemStyling(selected), 'border-0', className)}
      {...props}
    >
      {/* Main container - handles overall layout and spacing */}
      <div
        className={cn(
          `py-${py}`,
          `px-${px}`,
          'relative flex flex-row items-center justify-between customtext-label-large'
        )}
      >
        {/* Left content container - handles icon and text with overflow protection */}
        <div className="flex items-center gap-xs min-w-0 w-full overflow-hidden">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className={cn(!multiline && 'truncate max-w-full')}>{children}</span>
        </div>
        {selected && showSelectedIcon && (
          <span className="flex items-center justify-center flex-shrink-0">
            <Check size={16} />
          </span>
        )}
      </div>
    </button>
  )
);
StandaloneSelectItem.displayName = 'StandaloneSelectItem';

/**
 * SelectLabel: A label for the dropdown menu
 */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & { className?: string }
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-xs py-2xs customtext-label-medium text-on-surface-variant', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

/**
 * SelectScrollUpButton: The button for scrolling up in the dropdown menu
 */
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & { className?: string }
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-xs hover:bg-state-layer-low',
      className
    )}
    {...props}
  >
    <CaretUp size={16} />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

/**
 * SelectScrollDownButton: The button for scrolling down in the dropdown menu
 */
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> & { className?: string }
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-xs hover:bg-state-layer-low',
      className
    )}
    {...props}
  >
    <CaretDown size={16} />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

/**
 * SelectSeparator: A separator for the dropdown menu
 */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & { className?: string }
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-my-2xs h-px bg-outline-variant', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  StandaloneSelectItem,
};
