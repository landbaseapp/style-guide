import { Icon, Info, Confetti, Lightbulb, WarningCircle, X } from '@phosphor-icons/react';
import { cn } from 'src/utils/tw.utils';
import { unwrapIcon } from '../Icon';
import { Typography } from '../Typography/Typography';
import { IconButton } from '../Button/IconButton';

const BannerVariant = {
  info: 'bg-info-container border-on-info-container text-on-info-container',
  positive: 'bg-success-container border-on-success-container text-on-success-container',
  warning: 'bg-warning-container border-on-warning-container text-on-warning-container',
  negative: 'bg-error-container border-on-error-container text-on-error-container',
} as const;

const DefaultIcons: Record<keyof typeof BannerVariant, Icon> = {
  info: Info,
  positive: Confetti,
  warning: Lightbulb,
  negative: WarningCircle,
};

const BannerLayout = {
  vertical: 'w-[360px] gap-2xs items-start py-xs',
  horizontal: 'w-[640px] py-[10px]',
} as const;

interface BannerProps {
  descriptionIcon?: Icon;
  description: string | React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  variant?: keyof typeof BannerVariant;
  layout?: keyof typeof BannerLayout;
  className?: string;
  border?: 'bottom' | 'all';
}

export const Banner = ({
  description,
  action,
  onClose,
  descriptionIcon,
  variant = 'info',
  layout = 'horizontal',
  className,
  border = 'all',
}: BannerProps) => {
  const icon = descriptionIcon || DefaultIcons[variant];

  return (
    <div
      className={cn(
        'flex flex-row items-center justify-between px-sm',
        BannerVariant[variant],
        BannerLayout[layout],
        border === 'bottom' && 'border-b',
        border === 'all' && 'border rounded-md',
        className
      )}
      role="alert"
      aria-live={variant === 'negative' || variant === 'warning' ? 'assertive' : 'polite'}
    >
      <div className="flex flex-col gap-xs">
        <div className="flex items-center gap-xs">
          {unwrapIcon(icon, 16)}
          {typeof description === 'string' ? (
            <Typography variant="body-medium" className="whitespace-pre-wrap">
              {description}
            </Typography>
          ) : (
            description
          )}
        </div>
        {action && layout === 'vertical' && (
          <div className="pl-[24px]">
            <Typography variant="body-medium" className={cn(BannerVariant[variant])}>
              {action}
            </Typography>
          </div>
        )}
      </div>
      <div className="flex items-center gap-xs">
        {action && layout === 'horizontal' && (
          <Typography variant="body-medium" className={cn(BannerVariant[variant])}>
            {action}
          </Typography>
        )}
        {onClose && (
          <IconButton
            variant="ghost"
            size="xs"
            onClick={onClose}
            className={cn(BannerVariant[variant])}
            icon={X}
          />
        )}
      </div>
    </div>
  );
};
