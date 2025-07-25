import * as React from 'react';
import { Header, HeaderProps } from './Header';
import { cn } from 'src/utils/tw.utils';

export interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement>, HeaderProps {
  className?: string;
}

export const PageWrapper = React.forwardRef<HTMLDivElement, PageWrapperProps>(
  (
    { label, className, children, leftSection, rightSection, description, onEdit, ...divProps },
    ref
  ) => {
    const headerProps = { leftSection, rightSection, description, onEdit, label };

    return (
      <div ref={ref} className={cn('h-full', className)} {...divProps}>
        <Header {...headerProps} />
        {/* TODO: Replace div to Layout Component */}
        <div className="h-full">{children}</div>
      </div>
    );
  }
);
PageWrapper.displayName = 'PageWrapper';
