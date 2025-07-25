import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from 'src/utils/tw.utils';
import { Icon } from '@phosphor-icons/react';
import { unwrapIcon } from '../Icon';
import { cva } from 'class-variance-authority';

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva('flex flex-row h-[48px]', {
  variants: {
    variant: {
      default: '[&::-webkit-scrollbar]:h-[1px] border-b border-outline-variant',
      simple: 'px-md pt-xs my-auto',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    className?: string;
    variant?: 'default' | 'simple';
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const tabTriggerVariants = cva(
  'group inline-flex items-center text-center justify-center cursor-pointer whitespace-nowrap',
  {
    variants: {
      variant: {
        default: cn(
          'bg-transparent h-[48px] customtext-label-large px-md rounded-t-sm hover:bg-state-layer-low',
          'text-on-surface-variant data-[state=active]:text-primary',
          'border-0 border-b-[1px] border-outline-variant data-[state=active]:pt-[2px]'
        ),
        simple: cn(
          'text-on-surface-variant customtext-title-large',
          'border-none rounded-none gap-xs p-0'
        ),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    className?: string;
    vertical?: boolean;
    leftIcon?: Icon;
    rightIcon?: React.ReactNode;
    label?: string;
    hasBackground?: boolean;
    variant?: 'default' | 'simple';
  }
>(
  (
    { className, leftIcon, rightIcon, variant = 'default', label, hasBackground = false, ...props },
    ref
  ) => {
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          props.vertical ? 'flex-col' : 'flex-row gap-xs',
          variant === 'default'
            ? ''
            : hasBackground
            ? 'data-[state=active]:bg-ghost-active data-[state=active]:text-on-ghost'
            : 'data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:border-b-[2px] ',
          tabTriggerVariants({ variant }),
          className
        )}
        {...props}
      >
        {leftIcon && unwrapIcon(leftIcon, 16)}
        {variant === 'simple' ? (
          <span
            className={cn(
              'relative flex items-center font-satoshi',
              'after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px]',
              'after:rounded-full after:bg-[#36C474]',
              'after:opacity-0 group-hover:after:opacity-100 group-data-[state=active]:after:opacity-100',
              'after:transition-opacity after:duration-200'
            )}
          >
            {label}
          </span>
        ) : (
          label
        )}
        {rightIcon}
      </TabsPrimitive.Trigger>
    );
  }
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const CustomTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    className?: string;
    vertical?: boolean;
    children: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center text-center justify-center whitespace-nowrap cursor-pointer',
      props.vertical ? 'flex-col' : 'flex-row gap-xs',
      'bg-transparent h-[48px] customtext-label-large px-md rounded-t-sm hover:bg-state-layer-low',
      'text-on-surface-variant data-[state=active]:text-primary',
      'border-0 border-b-[1px] border-outline-variant data-[state=active]:border-primary data-[state=active]:border-b-[2px] data-[state=active]:pt-[2px]',
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & { className?: string }
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'py-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export const useTabState = ({ defaultState }: { defaultState: string }) => {
  const [view, _setView] = React.useState(defaultState);

  const setView = (value: string) => {
    _setView(value);
  };

  return {
    view,
    setView,
  };
};

export { Tabs, TabsList, TabsTrigger, CustomTabsTrigger, TabsContent };
