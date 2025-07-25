import { cva } from 'class-variance-authority';
import React from 'react';
import { cn } from 'src/utils/tw.utils';

const datatableToolbarVariants = cva(
  'text-on-surface-muted border-outline-variant bg-surface-dim w-full flex min-h-[56px] justify-between items-center self-stretch',
  {
    variants: {
      variant: {
        'top-toolbar': 'border-b p-xs',
        'top-toolbar-tabs': 'border-b px-xs min-h-0 items-end h-[48px]',
        'bottom-toolbar': 'border-t pl-md',
      },
    },
    defaultVariants: {
      variant: 'top-toolbar',
    },
  }
);

interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'top-toolbar' | 'top-toolbar-tabs' | 'bottom-toolbar';
}

export const DataTableToolbar = React.forwardRef<HTMLDivElement, DataTableToolbarProps>(
  ({ className, variant, children, ...props }, ref) => (
    <div ref={ref} className={cn(datatableToolbarVariants({ variant, className }))} {...props}>
      {children}
    </div>
  )
);
