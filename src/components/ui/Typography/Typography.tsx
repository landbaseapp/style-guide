import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/utils/tw.utils';

const labelVariants = cva('', {
  variants: {
    variant: {
      'display-large': 'customtext-display-large',
      'display-medium': 'customtext-display-medium',
      'display-small': 'customtext-display-small',
      'headline-large': 'customtext-headline-large',
      'headline-medium': 'customtext-headline-medium',
      'headline-small': 'customtext-headline-small',
      'title-large': 'customtext-title-large',
      'title-medium': 'customtext-title-medium',
      'title-small': 'customtext-title-small',
      'label-large': 'customtext-label-large',
      'label-large-prominent': 'customtext-label-large-prominent',
      'label-medium': 'customtext-label-medium',
      'label-medium-prominent': 'customtext-label-medium-prominent',
      'label-small': 'customtext-label-small',
      'body-large': 'customtext-body-large',
      'body-medium': 'customtext-body-medium',
      'body-small': 'customtext-body-small',
    },
  },
  defaultVariants: {
    variant: 'body-medium',
  },
});

export type TypographyVariant = VariantProps<typeof labelVariants>['variant'];

export interface TypographyProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof labelVariants> {
  asChild?: boolean;
  tagType?: 'div' | 'span';
}

const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(
  ({ className, variant, tagType, ...props }, ref) => {
    const compProps = {
      ref: ref,
      className: cn(className, labelVariants({ variant })),
      ...props,
    };

    if (tagType === 'span') {
      return <span {...compProps} />;
    }

    return <div {...compProps} />;
  }
);

Typography.displayName = 'Typography';

export { Typography };
