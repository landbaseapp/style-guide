import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from 'src/utils/tw.utils';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';

interface PersistentTooltipProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
  title: string;
  description: string;
  closeBtnText: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export const PersistentTooltip = React.memo(
  ({
    title,
    description,
    closeBtnText,
    side = 'bottom',
    children,
    ...props
  }: PersistentTooltipProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleCloseClick = () => setIsOpen(false);

    return (
      <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root open={isOpen} {...props}>
          <TooltipPrimitive.Trigger asChild onMouseEnter={handleMouseEnter}>
            {children}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              side={side}
              sideOffset={4}
              onMouseEnter={handleMouseEnter}
              className={cn(
                'z-[999] max-w-[320px] rounded-lg bg-surface-container text-on-surface-container p-md',
                'border border-outline-variant',
                'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
                'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
                'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
              )}
            >
              <div className="flex flex-col gap-2">
                <Typography variant="label-large-prominent" className="text-on-surface-variant">
                  {title}
                </Typography>
                <Typography variant="body-small" className="text-on-surface-variant font-normal">
                  {description}
                </Typography>
                <Button variant="ghost" className="self-end" onClick={handleCloseClick}>
                  {closeBtnText}
                </Button>
              </div>
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  }
);

PersistentTooltip.displayName = 'PersistentTooltip';
