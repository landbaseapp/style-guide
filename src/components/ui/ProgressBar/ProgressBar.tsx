import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/utils/tw.utils';

export type ProgressBarSize = 'sm' | 'md' | 'lg';
export type ProgressBarMode = 'hidden' | 'below' | 'front';
export type ProgressBarType = 'determinate' | 'indeterminate';

export interface ProgressBarProps
  extends VariantProps<typeof progressBarVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  progressPercentage?: number;
  className?: string;
  type?: ProgressBarType;
}

const progressBarVariants = cva('relative flex rounded-full', {
  variants: {
    size: {
      sm: 'h-2xs',
      md: 'h-xs',
      lg: 'h-sm',
    },
    mode: {
      hidden: 'ml-auto',
      below: 'gap-xs items-end ml-auto',
      front: 'gap-xs items-center ml-auto',
    },
  },
  defaultVariants: {
    size: 'md',
    mode: 'hidden',
  },
});

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercentage = 0,
  size,
  mode,
  className,
  type = 'determinate',
}) => {
  return (
    <div className="w-full">
      <div className={cn(progressBarVariants({ size, mode }), className)}>
        {mode === 'front' && type === 'determinate' && (
          <span className="text-on-surface-variant w-[32px] flex-shrink-0 text-right">
            {progressPercentage}%
          </span>
        )}

        {/* Progress Bar */}
        <div
          className={cn(
            'relative bg-surface-container-highest rounded-full h-full overflow-hidden',
            mode === 'front' ? 'flex-1' : 'w-full'
          )}
        >
          {type === 'determinate' ? (
            <div
              className="bg-primary rounded-full transition-all h-full absolute left-0"
              style={{
                width: progressPercentage === 0 ? '8px' : `${progressPercentage}%`,
              }}
            />
          ) : (
            <div
              className="h-full w-full flex-1 bg-primary transition-all absolute animate-indeterminate"
              style={{
                transform: `translateX(-100%)`,
              }}
            />
          )}
        </div>
      </div>
      {mode === 'below' && type === 'determinate' && (
        <div className="text-on-surface-variant mt-xs items-end flex w-full justify-end">
          {progressPercentage}%
        </div>
      )}
    </div>
  );
};
