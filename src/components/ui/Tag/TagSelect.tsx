import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, CaretDown, Icon } from '@phosphor-icons/react';
import { cn } from 'src/utils/tw.utils';
import { tagVariants } from './Tag';
import { unwrapIcon } from '../Icon';

const TagSelect = SelectPrimitive.Root;
const TagSelectValue = SelectPrimitive.Value;

const TagSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, 'ref'> & {
    className?: string;
    triggerRef?: React.RefObject<HTMLButtonElement>;
    icon?: Icon;
  }
>(({ className, children, triggerRef, icon, asChild, ...props }, ref) => {
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
      className={cn(
        asChild ? '' : tagVariants({ variant: 'outline' }),
        className,
        'justify-between items-center'
      )}
      asChild={asChild}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{unwrapIcon(icon, 16)}</span>}
          <span>{children}</span>
          <SelectPrimitive.Icon asChild>
            <CaretDown size={16} />
          </SelectPrimitive.Icon>
        </>
      )}
    </SelectPrimitive.Trigger>
  );
});
SelectPrimitive.SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const TagSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>, 'ref'> & {
    className?: string;
    position?: 'popper' | 'item-aligned';
    triggerRef?: React.RefObject<HTMLButtonElement | HTMLSpanElement>;
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
          `relative z-[1202] max-h-[24rem] w-full overflow-hidden`,
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
        <SelectPrimitive.SelectScrollUpButton />
        <SelectPrimitive.Viewport className="w-full">{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
TagSelectContent.displayName = SelectPrimitive.Content.displayName;

/**
 * SelectItem: An individual item in the dropdown menu
 */
const TagSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    className?: string;
    selected?: boolean;
    disabled?: boolean;
    icon?: Icon;
    children: React.ReactNode;
    value: string;
  }
>(({ className, selected = false, disabled = false, icon, children, value, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    disabled={disabled}
    value={value}
    className={cn('border-0 w-full bg-transparent', className)}
    {...props}
  >
    <div
      className={cn(
        tagVariants({ variant: selected ? 'default' : 'outline' }),
        'box-border',
        'relative flex flex-row w-full border-0 items-center justify-between py-xs px-md'
      )}
    >
      <div className="flex items-center gap-xs w-full overflow-hidden">
        {icon && <span className="flex-shrink-0">{unwrapIcon(icon, 16)}</span>}
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
TagSelectItem.displayName = SelectPrimitive.Item.displayName;

export { TagSelect, TagSelectValue, TagSelectTrigger, TagSelectItem, TagSelectContent };
