import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from 'src/utils/tw.utils';
import { Icon, Minus, Plus } from '@phosphor-icons/react';
import { unwrapIcon } from '../Icon';
import { Typography } from '../Typography';

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & { className?: string }
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root ref={ref} className={cn('flex flex-col gap-sm', className)} {...props} />
));
Accordion.displayName = 'Accordion';

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & { className?: string }
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'w-full flex flex-col min-h-[48px] border border-outline-variant rounded-md px-0 pl-sm pr-md align-center gap-xs strech',
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const CustomAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    className?: string;
    headerClassName?: string;
    noIcon?: boolean;
    triggerIcon?: Icon;
  }
>(({ className, children, headerClassName, noIcon, triggerIcon, ...props }, ref) => (
  <AccordionPrimitive.Header className={cn('flex p-0 m-0', headerClassName)}>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'cursor-pointer border-0',
        'flex flex-1 h-[48px] gap-md items-center justify-between py-md text-on-surface-variant transition-all cursor-pointer',
        '[&[data-state=open]>.plus-icon]:hidden',
        '[&[data-state=closed]>.minus-icon]:hidden',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-xs customtext-title-small">{children}</div>

      {noIcon ? undefined : triggerIcon ? (
        unwrapIcon(triggerIcon, 16)
      ) : (
        <>
          <Minus
            size={16}
            className="minus-icon shrink-0 text-on-surface-variant transition-transform duration-200 ease-in-out"
          />

          <Plus
            size={16}
            className="plus-icon shrink-0 text-on-surface-variant transition-transform duration-300 ease-in-out"
            aria-hidden="true"
          />
        </>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
CustomAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    className?: string;
    label: string;
    icon?: Icon;
    triggerIcon?: Icon;
  }
>(({ className, icon, label, triggerIcon, ...props }, ref) => (
  <CustomAccordionTrigger {...props} triggerIcon={triggerIcon} ref={ref} className={cn(className)}>
    {icon && unwrapIcon(icon, 16)}
    <Typography variant="title-small">{label}</Typography>
  </CustomAccordionTrigger>
));
CustomAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      'pb-md pt-0 flex flex-col gap-sm text-on-surface-variant data-[state=open]:overflow-visible',
      className
    )}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, CustomAccordionTrigger, AccordionTrigger, AccordionContent };
