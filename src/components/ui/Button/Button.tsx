import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/utils/tw.utils';
import { Icon } from '@phosphor-icons/react';
import { unwrapIcon } from '../Icon';

const baseStyles = `
  items-center flex flex-row justify-center rounded-full transition-colors cursor-pointer border-0
  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed
` as const;

export const buttonModes = {
  primary: `
    bg-primary text-on-primary
    hover:bg-primary-hover active:bg-primary-active focus-visible:bg-primary-active
    aria-disabled:bg-disabled aria-disabled:text-on-disabled aria-disabled:opacity-50
    disabled:bg-disabled disabled:text-on-disabled disabled:opacity-50
  `,
  accent: `
    bg-accent text-on-accent
    hover:bg-accent-hover active:bg-accent-active focus-visible:bg-accent-active
    aria-disabled:bg-disabled aria-disabled:text-on-disabled aria-disabled:opacity-50
    disabled:bg-disabled disabled:text-on-disabled disabled:opacity-50
  `,
  danger: `
    bg-error-container text-on-error-container
    hover:bg-error-container-hover active:bg-error-container-active focus-visible:bg-error-container-active
    aria-disabled:bg-disabled aria-disabled:text-on-disabled aria-disabled:opacity-50
    disabled:bg-disabled disabled:text-on-disabled disabled:opacity-50
  `,
  ghost: `
    bg-ghost text-primary
    hover:bg-ghost-hover active:bg-ghost-active focus-visible:bg-ghost-active
    aria-disabled:text-disabled aria-disabled:opacity-50
    disabled:text-disabled disabled:opacity-50
  `,
  text: `
    bg-transparent text-primary hover:bg-transparent active:bg-transparent focus:bg-transparent
    hover:text-primary-hover active:text-primary-active focus-visible:text-primary-active hover:underline
    aria-disabled:text-disabled aria-disabled:opacity-50
    disabled:text-disabled disabled:opacity-50
  `,
  outline: `
    border border-primary text-primary
    hover:border-primary-hover hover:bg-ghost-hover active:border-primary-active active:bg-ghost-active focus-visible:border-primary-active focus-visible:bg-ghost-active
    aria-disabled:bg-ghost aria-disabled:text-disabled aria-disabled:opacity-50
    disabled:bg-ghost disabled:text-disabled disabled:opacity-50
`,
};

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export type ButtonVariant = ButtonVariantProps['variant'];

export const iconButtonSizes = {
  md: 'h-[40px] px-md py-xs customtext-label-large',
  sm: 'h-[32px] rounded-all px-md py-2xs customtext-label-large',
  xs: 'h-[24px] rounded-all px-xs pl-sm py-2xs gap-2xs customtext-label-small',
  // text size will be inherited
  text: '',
} as const;

export const buttonVariants = cva(baseStyles, {
  variants: {
    variant: buttonModes,
    size: iconButtonSizes,
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean;
  leftIcon?: Icon;
  rightIcon?: Icon;

  /**
   * add more if needed
   */
  display?: 'block' | 'inline-flex';

  type?: 'button' | 'submit' | 'reset';
}

const iconClassNames = {
  md: {
    rightIcon: 'ml-[10px]',
    leftIcon: 'mr-[10px]',
  },
  sm: {
    rightIcon: 'ml-[8px]',
    leftIcon: 'mr-[8px]',
  },
  xs: {
    rightIcon: 'ml-[4px]',
    leftIcon: 'mr-[4px]',
  },
  text: {
    rightIcon: 'ml-[10px]',
    leftIcon: 'mr-[10px]',
  },
} as const;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size,
      leftIcon,
      rightIcon,
      asChild = false,
      children,
      type = 'button',
      display = 'inline-flex',
      ...props
    },
    ref
  ) => {
    if ((variant === 'text' && size !== 'text') || (size === 'text' && variant !== 'text')) {
      throw new Error('Text buttons must have a size of "text" and variant of "text"');
    }

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(display, buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        type={type}
      >
        {leftIcon && (
          <div className={iconClassNames[size ?? 'md']?.leftIcon ?? ''}>
            {unwrapIcon(leftIcon, 16)}
          </div>
        )}
        {children}
        {rightIcon && (
          <div className={iconClassNames[size ?? 'md']?.rightIcon ?? ''}>
            {unwrapIcon(rightIcon, 16)}
          </div>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
