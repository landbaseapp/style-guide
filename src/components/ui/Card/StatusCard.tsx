import { Card, CustomCardHeader } from 'src/components/ui/Card';
import { memo, ReactElement } from 'react';
import { Typography } from 'src/components/ui/Typography';
import { Icon } from '@phosphor-icons/react';
import { unwrapIcon } from '../Icon';
import { cn } from 'src/utils/tw.utils';
import { Divider } from '../Divider';
import { Skeleton } from 'src/components/ui/Skeleton';

export interface StatusCardProps {
  title: string;
  value?: ReactElement | string | number;
  percentage?: number;
  subtitle?: string;
  icon?: Icon;
  iconClassName?: string;
}

export const StatusCard = memo(
  ({ icon, title, value = 'n/a', percentage, subtitle, iconClassName }: StatusCardProps) => {
    return (
      <Card className="flex flex-grow h-full bg-surface-container-lowest border-outline-variant text-on-surface-variant border-none">
        <CustomCardHeader className="flex flex-col w-full items-center justify-center">
          <div className="flex flex-row items-center gap-2xs">
            <div className={cn('rounded-full', iconClassName)}>{icon && unwrapIcon(icon, 16)}</div>
            <Typography variant="label-large">{title}</Typography>
          </div>
          <div className="flex flex-row items-center gap-2xs">
            <Typography variant="display-small" className="text-center">
              {value}
            </Typography>
            <PercentageDisplay percentage={percentage} />
          </div>

          {subtitle && (
            <Typography variant="body-small" className="text-on-surface-muted">
              {subtitle}
            </Typography>
          )}
        </CustomCardHeader>
      </Card>
    );
  }
);

const PercentageDisplay = ({ percentage }: { percentage?: number | null }) => {
  if (percentage === undefined || percentage === null) {
    return null;
  }

  return (
    <Typography variant="body-medium" className="text-center">
      ({percentage}%)
    </Typography>
  );
};

interface Props {
  items: StatusCardProps[];
  className?: string;
}

export const StatusCards = memo(({ items, className }: Props) => {
  if (!items.length) {
    return null;
  }

  return (
    <div className={cn('grid gap-md md:grid-cols-2 lg:grid-cols-4', className)}>
      {items.map(({ ...props }, index) => (
        <div className="flex flex-row items-center gap-md" key={index}>
          <StatusCard {...props} />
          {index !== items.length - 1 && <Divider orientation="vertical" className="h-[100px]" />}
        </div>
      ))}
    </div>
  );
});

export const StatusCardsSkeleton = () => {
  return (
    <div className="grid gap-md md:grid-cols-2 lg:grid-cols-4 my-md">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="flex flex-row items-center gap-md" key={index}>
          <Skeleton className="h-[100px] w-full" />
        </div>
      ))}
    </div>
  );
};
