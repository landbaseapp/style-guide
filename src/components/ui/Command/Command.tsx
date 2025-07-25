import * as React from 'react';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from 'src/utils/tw.utils';
import { Dialog, DialogContent } from 'src/components/ui/Dialog/Dialog';
import { MagnifyingGlass } from '@phosphor-icons/react';

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      // basic padding
      'flex h-full w-full flex-col outline-none pb-2xs rounded-md',
      // colors
      'border-outline-variant bg-surface-container-low text-on-surface-variant overflow-hidden',
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="bg-surface-container-low">{children}</Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b border-outline-variant px-3">
    <MagnifyingGlass size={24} className="mr-2xs shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        // slightly modified input styles
        'flex min-h-[40px] w-full rounded-md bg-transparent py-xs outline-none',
        'customtext-body-medium text-on-surface placeholder:text-on-surface-muted',
        'disabled:cursor-not-allowed disabled:opacity-50 border-0',
        className
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm gap-xs py-xs px-md outline-none customtext-label-large',
      '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
    )}
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden customtext-label-medium',
      '[&_[cmdk-group-heading]]:px-xs [&_[cmdk-group-heading]]:py-2xs',
      '[&_[cmdk-group-heading]]:text-on-surface-variant [&_[cmdk-group-heading]]:customtext-label-medium',
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 h-px bg-outline-variant', className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm gap-xs py-xs px-md outline-none customtext-label-large',
      "data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50 data-[selected='true']:bg-selected data-[selected=true]:text-on-selected",
      '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      className
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
};
