import { EnvelopeSimple, EnvelopeSimpleOpen, Trash } from '@phosphor-icons/react';
import { IconButton } from 'src/components/ui/Button';
import { StepStatuses } from 'src/data/models/email.ts';
import { Typography } from 'src/components/ui/Typography';
import { cn } from 'src/utils/tw.utils';

interface StepCardProps {
  onRemoveStep?: () => void;
  onClick: (e: React.SyntheticEvent) => void;
  stepNumber: number;
  isActive: boolean;
  stepName: string;
  stepStatus?: StepStatuses;
  actualSendDate?: string;
}

export const StepCard = ({
  onRemoveStep,
  onClick,
  stepNumber,
  stepStatus = StepStatuses.scheduled,
  isActive,
  actualSendDate,
}: StepCardProps) => {
  const onRemove = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onRemoveStep && onRemoveStep();
  };

  const isScheduled = stepStatus === StepStatuses.scheduled;

  if (!isActive) {
    return (
      <IconButton
        onClick={(e) => onClick(e)}
        variant="primary"
        icon={isScheduled ? EnvelopeSimpleOpen : EnvelopeSimple}
        size="sm"
      />
    );
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'py-2xs px-sm gap-xs',
        'inline-flex items-center justify-center rounded-full transition-colors cursor-pointer focus-visible:outline-none',
        'bg-primary-container text-on-primary-container hover:bg-primary-container-hover active:bg-primary-container-active',
        isActive && onRemoveStep && 'justify-between'
      )}
    >
      <IconButton
        icon={isScheduled ? EnvelopeSimpleOpen : EnvelopeSimple}
        size="sm"
        className="bg-transparent pointer-events-none"
      />

      {isActive && (
        <Typography variant="body-medium">
          Step {stepNumber}
          {!!actualSendDate && ' (Sent)'}
        </Typography>
      )}

      {onRemoveStep && (
        <IconButton
          icon={Trash}
          variant="danger"
          size="sm"
          onClick={onRemove}
          className="bg-transparent"
        />
      )}
    </div>
  );
};
