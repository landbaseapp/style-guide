import { ReactNode } from 'react';
import { cn } from 'src/utils/tw.utils';

interface NavigationProps {
  children: ReactNode;
  className?: string;
}

export function Navigation({ children, className }: NavigationProps) {
  return <nav className={cn('flex flex-col gap-2xs', className)}>{children}</nav>;
}

Navigation.displayName = 'Navigation';

export interface NavigationItemProps {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  badge?: ReactNode;
  className?: string;
}

export function NavigationItem({
  selected,
  onClick,
  children,
  badge,
  className,
}: NavigationItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-row items-center gap-xs px-md py-xs rounded-lg w-full transition-colors cursor-pointer border-0',
        'text-on-surface-variant hover:bg-primary-container-hover active:bg-primary-container-active focus:bg-primary-container-focus',
        selected && 'bg-primary-container',
        className
      )}
    >
      <span className="flex-1 text-left">{children}</span>
      {badge && <span className="flex-shrink-0">{badge}</span>}
    </button>
  );
}

NavigationItem.displayName = 'NavigationItem';
