import { Toaster as Sonner, toast as sonnerToast } from 'sonner';
import React from 'react';
import { cn } from 'src/utils/tw.utils';
import { IconButton } from '../Button';
import { X } from '@phosphor-icons/react';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={'system'}
      className={cn('toaster group z-[999]')}
      position="bottom-left"
      closeButton={true}
      {...props}
    />
  );
};

function openSnackbar(toast: Omit<ToastProps, 'id' | 'description'>) {
  return sonnerToast.custom((id) => <Toast id={id} {...toast} />);
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props: ToastProps) {
  const { title, button, id, closeButton } = props;

  return (
    <div
      className="flex rounded-lg items-center bg-surface-inverse shadow-lg w-full md:max-w-[364px] py-2xs pl-md pr-xs"
      role="alert"
      aria-live="polite"
    >
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="customtext-body-medium text-on-surface-inverse">{title}</p>
        </div>
      </div>
      <div className="ml-md shrink-0 flex items-center gap-xs">
        {button && (
          <button
            aria-label={button.label}
            className={cn(
              'rounded bg-transparent px-sm ring-0 border-none customtext-label-large',
              'text-accent hover:text-accent-hover hover:bg-ghost-hover active:bg-ghost-active'
            )}
            onClick={() => {
              button.onClick();
              sonnerToast.dismiss(id);
            }}
          >
            {button.label}
          </button>
        )}
        {closeButton && (
          <IconButton
            variant="ghost"
            size="sm"
            icon={X}
            className="text-on-surface-inverse"
            onClick={() => sonnerToast.dismiss(id)}
          />
        )}
      </div>
    </div>
  );
}

interface ToastProps {
  id: string | number;
  title: string | React.ReactNode;
  closeButton?: boolean;
  severity?: 'error' | 'warning' | 'info' | 'success';
  button?: {
    label: string;
    onClick: () => void;
  };
}

export { Toaster, openSnackbar };
