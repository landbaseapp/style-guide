import { IconProps } from '@phosphor-icons/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { cn } from 'src/utils/tw.utils';
import { Button } from '../Button';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({ ...props }: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal {...props} />
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-surface-container/80 backdrop-blur-0',
      // Animations
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    className?: string;
  } & { classNameOverlay?: string }
>(({ className, children, classNameOverlay, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay className={classNameOverlay} />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed overflow-y-visible max-h-[90vh] left-[50%] top-[50%] z-[1201] grid w-full translate-x-[-50%] translate-y-[-50%] gap-lg',
        'bg-surface p-lg shadow-lg text-on-surface-variant min-w-[400px]',
        'duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-md md:w-full',
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col text-start gap-0 customtext-title-medium text-on-surface-variant',
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  children,
  cancelText,
  onCancel,
  withoutCancel = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  cancelText?: string;
  onCancel?: () => void;
  withoutCancel?: boolean;
}) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-xs',
      className
    )}
    {...props}
  >
    {!withoutCancel && (
      <DialogPrimitive.Close asChild>
        <Button variant="ghost" onClick={onCancel}>
          {cancelText ?? 'Cancel'}
        </Button>
      </DialogPrimitive.Close>
    )}
    {children}
  </div>
);
DialogFooter.displayName = 'DialogFooter';

const DialogIcon = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & {
    className?: string;
    children: React.ReactElement<IconProps>;
  }
>(({ className, children, ...props }, ref) => {
  const icon = React.cloneElement(children, {
    size: 24,
  });

  return (
    <div
      ref={ref}
      className={cn('h-[24px] w-full flex justify-center mx-auto', className)}
      {...props}
    >
      {icon}
    </div>
  );
});
DialogIcon.displayName = 'DialogIcon';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('customtext-title-medium w-full text-start text-on-surface p-0 m-0', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      'customtext-body-medium w-full text-start text-on-surface-variant m-0',
      className
    )}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
  DialogTrigger,
};
