import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from 'src/utils/tw.utils';
import { Typography } from '../Typography/Typography';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    className?: string;
    sideOffset?: number;
  }
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-[1202] max-w-[200px] whitespace-normal overflow-hidden rounded-sm bg-surface-inverse text-on-surface-inverse px-xs py-0',
      'text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const GeneralToolTip = ({
  title,
  children,
  delay = 100,
  side = 'bottom',
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Tooltip> & {
  title: string;
  delay?: number;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}) => {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip {...props}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPrimitive.Portal>
          <TooltipContent side={side} className={className}>
            <Typography variant="body-small" className="text-on-surface-inverse">
              {title}
            </Typography>
          </TooltipContent>
        </TooltipPrimitive.Portal>
      </Tooltip>
    </TooltipProvider>
  );
};

export {
  // avoid misuse
  Tooltip as CustomTooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  GeneralToolTip,
};
