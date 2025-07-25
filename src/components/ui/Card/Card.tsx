import * as React from 'react';
import { cn } from 'src/utils/tw.utils';
import { Typography } from '../Typography/Typography';
import { Icon } from '@phosphor-icons/react';
import { unwrapIcon } from '../Icon';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-md bg-surface border border-outline-variant text-on-surface-variant overflow-clip',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CustomCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-2xs p-md', className)} {...props} />
  )
);
CustomCardHeader.displayName = 'CardHeader';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    icon?: Icon;
    title: string;
    description?: string | React.ReactNode;
    actions?: React.ReactNode;
    label?: React.ReactNode;
  }
>(({ className, icon, title, description, actions, label, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-row justify-between pl-md py-xs pr-xs bg-surface-dim border-b border-outline-variant rounded-t-md',
      className
    )}
    {...props}
  >
    <div className="flex flex-row items-center gap-xs">
      {icon && unwrapIcon(icon, 24)}
      <Typography variant="title-small" className="text-start text-on-surface-variant">
        {title}
      </Typography>
    </div>

    <div className="flex flex-row items-center gap-2xs">
      {description && <Typography variant="body-small">{description}</Typography>}
      {label}
      {actions}
    </div>
  </div>
));

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    label: string;
  }
>(({ className, label, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    <Typography variant="title-small" className="w-max">
      {label}
    </Typography>
  </div>
));

CardTitle.displayName = 'CardTitle';
const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props}>
      <Typography variant="body-medium" className="text-on-surface-variant">
        {children}
      </Typography>
    </div>
  )
);

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-md', className)} {...props} />
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-md pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CustomCardHeader, CardFooter, CardTitle, CardDescription, CardContent };
