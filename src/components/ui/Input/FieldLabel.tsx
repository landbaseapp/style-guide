import { memo } from 'react';
import { ArrowsClockwise } from '@phosphor-icons/react';

import { cn } from 'src/utils/tw.utils';
import { Typography } from '../Typography';
import { Button } from '../Button';

interface FieldLabelProps {
  label: string;
  value?: string | React.ReactNode;
  className?: string;
  onChange?: () => void;
  changeLabel?: string;
}

export const FieldLabel = memo(
  ({ className, label, value, onChange, changeLabel }: FieldLabelProps) => {
    const displayValue = !value ? '' : value;

    return (
      <div className={cn('flex gap-md', className)}>
        <div className="flex flex-col max-w-[800px]">
          <Typography variant="body-medium" className="text-on-surface-variant text-left">
            {label}
          </Typography>
          {typeof displayValue === 'string' ? (
            <Typography variant="body-large" className="text-on-surface text-left max-w-[800px]">
              {displayValue}
            </Typography>
          ) : (
            displayValue
          )}
        </div>

        {changeLabel && (
          <Button variant="ghost" onChange={onChange} leftIcon={ArrowsClockwise}>
            <Typography variant="body-medium">{changeLabel}</Typography>
          </Button>
        )}
      </div>
    );
  }
);
