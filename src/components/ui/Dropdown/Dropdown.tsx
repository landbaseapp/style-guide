import { Check, Icon } from '@phosphor-icons/react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';
import { cn } from 'src/utils/tw.utils';
import { unwrapIcon } from '../Icon';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Group
    ref={ref}
    className={cn('flex flex-col gap-2xs', className)}
    {...props}
  />
));
DropdownMenuGroup.displayName = DropdownMenuPrimitive.Group.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
    className?: string;
    sideOffset?: number;
  }
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-[1202] min-w-[8rem] overflow-hidden flex flex-col gap-2xs rounded-md border border-outline-variant bg-surface-container p-2xs text-on-surface-variant shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  className?: string;
  disabled?: boolean;
  selected?: boolean;
  icon?: Icon;
  children?: React.ReactNode;
}

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, disabled, selected, icon, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    disabled={disabled}
    className={cn(
      'outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 disabled:opacity-50 rounded-sm',
      selected
        ? 'bg-selected text-on-selected hover:bg-selected-hover focus:bg-selected-active active:bg-selected-active disabled:bg-disabled disabled:text-on-disabled data-[disabled]:bg-disabled data-[disabled]:text-on-disabled'
        : 'text-on-surface-variant bg-ghost hover:bg-ghost-hover active:bg-ghost-active focus:bg-ghost-active disabled:text-disabled data-[disabled]:text-disabled',
      className
    )}
    {...props}
  >
    <div
      className={cn(
        'relative flex flex-row w-full gap-xs justify-between cursor-default select-none items-center py-xs px-md customtext-label-large'
      )}
    >
      {icon && <span className="flex items-center justify-center">{unwrapIcon(icon, 16)}</span>}
      <span className="flex w-full gap-xs">{children}</span>
      {selected && (
        <span className="flex items-center justify-center">
          <Check size={16} />
        </span>
      )}
    </div>
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('px-xs py-2xs customtext-label-medium', className)}
    {...props}
  />
));
DropdownMenuPrimitive.DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-my-[3px] h-px bg-outline-variant', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export {
  DropdownMenu as CustomDropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};
