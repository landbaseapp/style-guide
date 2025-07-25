import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';
import { cn } from 'src/utils/tw.utils';
import { Icon } from '@phosphor-icons/react';

interface DialogProps {
  title: string | ReactNode;
  controls:
    | {
        open: boolean;
        onOpenChange: (open: boolean) => void;
      }
    | {
        trigger: ReactNode;
      };
  cancelText?: string;
  onCancel?: () => void;
  description?: string;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
  icon?: Icon;
  iconClassName?: string;
  withoutCancel?: boolean;
  disableOutsideClick?: boolean;
  classNameOverlay?: string;
}

export const GeneralDialog = ({
  controls,
  title,
  description,
  action: footer,
  cancelText,
  className,
  children,
  onCancel,
  withoutCancel = false,
  disableOutsideClick = false,
  classNameOverlay,
}: DialogProps) => {
  return (
    <Dialog
      {...('open' in controls ? { open: controls.open, onOpenChange: controls.onOpenChange } : {})}
    >
      {'trigger' in controls && <DialogTrigger asChild>{controls.trigger}</DialogTrigger>}
      <DialogContent
        className={cn('sm:max-w-[425px]', className)}
        classNameOverlay={classNameOverlay}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onEscapeKeyDown={disableOutsideClick ? (event) => event.preventDefault() : undefined}
        onPointerDownOutside={disableOutsideClick ? (event) => event.preventDefault() : undefined}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription className="whitespace-pre-wrap">{description}</DialogDescription>
          )}
        </DialogHeader>
        {children}
        <DialogFooter cancelText={cancelText} onCancel={onCancel} withoutCancel={withoutCancel}>
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const SimpleDialog = ({
  children,
  open,
}: Pick<DialogProps, 'children'> & { open: boolean }) => {
  if (!open) return null;

  return (
    <div className="fixed min-h-screen w-full h-full flex items-center justify-center p-0 top-0 left-0 z-50">
      {children}
    </div>
  );
};
