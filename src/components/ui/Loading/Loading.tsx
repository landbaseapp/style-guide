import { CircleNotch } from '@phosphor-icons/react';
import { cn } from 'src/utils/tw.utils';

interface LoadingProps {
  size?: number;
  className?: string;
}

export const Loading = ({ size = 24, className }: LoadingProps) => {
  return (
    <CircleNotch size={size} className={cn('animate-spin text-on-surface-variant', className)} />
  );
};

export const GeneralLoading = ({ className, size = 40 }: { className?: string; size?: number }) => {
  return (
    <div className={cn('flex justify-center items-center h-full', className)}>
      <Loading size={size} />
    </div>
  );
};

export const FullScreenLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loading size={40} />
    </div>
  );
};
