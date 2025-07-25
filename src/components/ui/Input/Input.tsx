import * as React from 'react';
import { cn } from 'src/utils/tw.utils';
import { Typography } from '../Typography/Typography';
import { XCircle, MagnifyingGlass, CurrencyDollar, PhonePlus } from '@phosphor-icons/react';
import { IconButton } from '../Button/IconButton';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leadingIcon?: 'search' | 'dollar' | 'plus';
  hideClearButton?: boolean;
  hideSpinButton?: boolean;
  preventEnter?: boolean;
  containerClassName?: string;
  wrapperClassName?: string;
  onClear?: () => void;
  errorMessage?: string;
  label?: string;
}

export interface LabelInputProps extends InputProps {
  label?: string;
  error?: boolean;
  disabled?: boolean;
}

function inputStyling({
  className,
  error,
  addPadding = true,
  leadingIcon = false,
}: {
  className?: string;
  error?: boolean;
  addPadding?: boolean;
  leadingIcon?: boolean;
}) {
  return cn(
    'flex bg-surface min-h-[40px] px-sm py-xs w-full rounded-sm relative',
    'customtext-body-medium text-on-surface placeholder:text-on-surface-muted',
    'transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'error:outline-error disabled:cursor-not-allowed disabled:opacity-50',
    error
      ? 'outline outline-error border-none'
      : 'border-0 outline outline-outline-variant active:outline-outline focus:outline-outline-accent',
    addPadding && 'pr-[32px]', // Add padding for X button
    leadingIcon && 'pl-[32px]', // Add padding for search icon
    className
  );
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      containerClassName,
      error,
      type,
      disabled,
      leadingIcon,
      hideClearButton,
      hideSpinButton,
      preventEnter,
      onClear,
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('relative ', wrapperClassName)}>
        <div className={cn('relative flex w-full', containerClassName)}>
          <input
            type={type}
            disabled={disabled}
            className={cn(
              inputStyling({
                className,
                error,
                addPadding: hideClearButton ? false : true,
                leadingIcon: leadingIcon != null,
              }),
              className,
              hideSpinButton && 'hide-input-spin'
            )}
            ref={ref}
            {...(preventEnter && {
              onKeyDown: (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
                // only allow numbers and enter key for currency input
                if (
                  type === 'currency' &&
                  !/^\d+$/.test(e.key) &&
                  e.key !== 'Enter' &&
                  e.key !== 'Backspace' &&
                  e.key !== 'Delete' &&
                  e.key !== 'Tab' &&
                  e.key !== 'ArrowLeft' &&
                  e.key !== 'ArrowRight' &&
                  e.key !== 'ArrowUp' &&
                  e.key !== 'ArrowDown' &&
                  e.key !== 'Home' &&
                  e.key !== 'End' &&
                  !(e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x'))
                ) {
                  e.preventDefault();
                }
              },
            })}
            {...props}
          />
          {leadingIcon && (
            <IconButton
              size="sm"
              variant="ghost"
              className="absolute pointer-events-none left-0 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-container-high"
              icon={
                leadingIcon === 'search'
                  ? MagnifyingGlass
                  : leadingIcon === 'dollar'
                  ? CurrencyDollar
                  : PhonePlus
              }
            />
          )}
          {/**
           * convert props.value to boolean.
           * or it will render 0 if props.value has type number and it is 0.
           */}
          {!!props.value && !disabled && !hideClearButton && (
            <IconButton
              size="sm"
              variant="ghost"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-container-high"
              onClick={() => {
                if (props.onChange) {
                  const event = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
                  props.onChange(event);
                }
                onClear?.();
              }}
              icon={XCircle}
            />
          )}
        </div>
        {error && errorMessage && (
          <Typography variant="body-small" className={cn('text-error mx-sm')}>
            {errorMessage}
          </Typography>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

const LabelInput = React.forwardRef<HTMLInputElement, LabelInputProps>(
  ({ label, error, errorMessage, disabled, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-2xs w-full', containerClassName)}>
        {label && (
          <Typography
            variant="label-medium"
            className={cn('text-on-surface-muted', disabled && 'opacity-50')}
          >
            {label}
          </Typography>
        )}
        <Input error={error} errorMessage={errorMessage} disabled={disabled} {...props} ref={ref} />
      </div>
    );
  }
);
LabelInput.displayName = 'LabelInput';

export { Input, LabelInput, inputStyling };
