import { cn } from 'src/utils/tw.utils';

interface OverlayProps {
  className?: string;
}

export const Overlay = ({ className }: OverlayProps) => {
  return (
    <div className={cn('absolute inset-0 bg-surface/50 backdrop-blur-[1px] z-[100]', className)} />
  );
};
