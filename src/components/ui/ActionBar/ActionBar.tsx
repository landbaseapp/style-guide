import { ArrowLeft, Icon } from '@phosphor-icons/react';
import { Button } from '../Button';
import { Typography } from '../Typography';
import { cn } from 'src/utils/tw.utils';
import { useContext } from 'react';
import { SidebarContext } from 'src/providers/SidebarProvider';

interface BaseActionBarProps {
  steps: {
    current: number;
    total: number;
  };
  label?: string;
  className?: string;
  onSaveDraft: () => void;
  next?: {
    label: string;
    icon: Icon;
    onClick: () => void;
    buttonVariant?: 'accent' | 'primary';
  };
}

interface ActionBarWithCancel extends BaseActionBarProps {
  onCancel: () => void;
  onBack?: never;
}

interface ActionBarWithBack extends BaseActionBarProps {
  onCancel?: never;
  onBack: () => void;
}

export const ActionBar = ({
  label,
  actions,
  className,
  children,
}: {
  label?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) => {
  const { open } = useContext(SidebarContext);

  return (
    <div
      className={cn(
        'flex items-center justify-between fixed bottom-0 px-[80px] z-10',
        open ? 'left-[216px]' : 'left-[77px]', // sidebar width
        'right-0',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between w-full bg-surface-container-high px-md py-sm',
          'rounded-t-md border border-outline-variant' // to account for chat icon
        )}
      >
        {/* left */}
        <Typography variant="body-medium" className="flex items-center text-on-surface">
          {label}
        </Typography>

        {/* right */}
        <div className="flex items-center gap-xs">
          {actions ? actions : null}
          {children ? children : null}
        </div>
      </div>
    </div>
  );
};

export const StepsActionBar = ({
  steps,
  label,
  onCancel,
  onBack,
  next,
  onSaveDraft,
  className,
}: ActionBarWithCancel | ActionBarWithBack) => {
  return (
    <ActionBar
      label={steps.total > 1 ? `Step ${steps.current} of ${steps.total} - ${label}` : label}
      actions={
        <>
          {onCancel && (
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {onBack && (
            <Button variant="ghost" onClick={onBack} leftIcon={ArrowLeft}>
              Back
            </Button>
          )}
          <Button variant="outline" type="button" onClick={onSaveDraft}>
            Save as draft
          </Button>
          {next && (
            <Button
              variant={next.buttonVariant ?? 'primary'}
              onClick={next.onClick}
              rightIcon={next.icon}
            >
              {next.label}
            </Button>
          )}
        </>
      }
      className={className}
    />
  );
};
