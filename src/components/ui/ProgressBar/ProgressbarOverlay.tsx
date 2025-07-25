import { cn } from 'src/utils/tw.utils';
import { Typography } from '../Typography';

interface ProgressBarOverlayProps {
  progressPercentage: number;
  className?: string;
}

export const ProgressBarOverlay = ({ progressPercentage }: ProgressBarOverlayProps) => {
  return (
    <div className="w-1/2">
      <div
        className={cn(
          'relative bg-surface-container-highest rounded-full h-[20px] w-full overflow-hidden'
        )}
      >
        <div
          className="bg-primary rounded-full transition-all absolute h-[80%] top-1/2 -translate-y-1/2"
          style={{
            width: progressPercentage === 0 ? '8px' : `calc(${progressPercentage}% - 4px)`,
            left: '2px',
          }}
        />
        <Typography
          variant="label-medium"
          className="absolute inset-0 flex items-center justify-start ml-sm text-brand-white"
        >
          {progressPercentage}%
        </Typography>
      </div>
    </div>
  );
};
