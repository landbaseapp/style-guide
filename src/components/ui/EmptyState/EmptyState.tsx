import { LoadingButton } from 'src/components/ui/Button';
import { Typography } from 'src/components/ui/Typography';
import { Icon } from '@phosphor-icons/react';
import { cn } from 'src/utils/tw.utils';

export function EmptyState({
  graphic,
  title,
  description,
  ctaButton,
  className,
  extraContent = null,
}: {
  graphic: React.ReactNode;
  title: string;
  description?: string;
  ctaButton?: {
    label: string;
    icon?: Icon;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: 'accent' | 'outline';
  };
  className?: string;
  extraContent?: React.ReactNode | null;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center mx-auto text-on-surface-variant p-md',
        className
      )}
    >
      {graphic}
      <Typography variant="headline-small" className="text-center mt-sm">
        {title}
      </Typography>
      <div className="whitespace-pre-wrap">
        {description && (
          <Typography variant="body-medium" className="text-center mt-xs">
            {description}
          </Typography>
        )}
      </div>
      {ctaButton && (
        <LoadingButton
          className="mt-lg"
          loading={ctaButton.loading}
          icon={ctaButton.icon}
          size="md"
          variant={ctaButton.variant || 'accent'}
          disabled={ctaButton.disabled}
          onClick={ctaButton.onClick}
        >
          {ctaButton.label}
        </LoadingButton>
      )}
      <div className="mt-lg">{extraContent}</div>
    </div>
  );
}
