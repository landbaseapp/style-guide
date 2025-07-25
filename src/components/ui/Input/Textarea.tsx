import { Typography } from '../Typography/Typography';
import * as React from 'react';
import { useEffect } from 'react';
import { cn } from 'src/utils/tw.utils';
import { inputStyling } from './Input';
import { IconButton } from '../Button/IconButton';
import { ArrowUp, Microphone, Paperclip, XCircle } from '@phosphor-icons/react';
import { Checkbox } from '../Checkbox/Checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover/Popover';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  className?: string;
  error?: boolean;
  enableResize?: boolean;
  rows?: number;
  maxRows?: number;
  errorMessage?: string;
  hideClearButton?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      enableResize,
      errorMessage,
      hideClearButton,
      rows,
      onChange,
      onBlur,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative flex flex-col gap-2xs">
        <textarea
          // styles should be consistent with input styles
          className={cn(
            inputStyling({ className, error, addPadding: !hideClearButton }),
            !enableResize && 'resize-none',
            'cursor-auto'
          )}
          rows={rows}
          onChange={(e) => onChange?.(e)}
          onBlur={(e) => onBlur?.(e)}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {props.value && !disabled && !hideClearButton && (
          <IconButton
            size="sm"
            variant="ghost"
            className={cn(
              'absolute right-0 -translate-y-1/2 p-1 rounded-full hover:bg-surface-container-high',
              error ? 'top-[35%]' : 'top-1/2'
            )}
            onClick={() => {
              if (onChange) {
                const event = { target: { value: '' } } as React.ChangeEvent<HTMLTextAreaElement>;
                onChange(event);
              }
            }}
            icon={XCircle}
          />
        )}
        {error && errorMessage && (
          <Typography variant="body-small" className={cn('text-error mx-sm')}>
            {errorMessage}
          </Typography>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

const ChatTextarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps & {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    autoApply?: boolean;
    setAutoApply?: (autoApply: boolean) => void;
    inputValue: string;
    onChangeInputValue: (value: string) => void;
    isRecording: boolean;
    handleToggleRecording: () => void;
  }
>(
  (
    {
      className,
      error,
      onSubmit,
      onChange,
      onBlur,
      disabled,
      autoApply,
      setAutoApply,
      inputValue,
      onChangeInputValue,
      isRecording,
      handleToggleRecording,
      ...props
    },
    ref
  ) => {
    const textareaRef = ref as React.MutableRefObject<HTMLTextAreaElement | null>;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      }
    };

    const handleResetHeight = () => {
      const target = textareaRef.current;
      if (target) {
        // Auto-grow logic
        target.style.height = 'auto';
        const newHeight = Math.min(target.scrollHeight, 200); // Cap at max height
        target.style.height = `${newHeight}px`;
      }
    };

    useEffect(() => {
      handleResetHeight();
    }, [inputValue]);

    return (
      <form onSubmit={onSubmit}>
        <div
          className={cn(
            inputStyling({ className, error, addPadding: false }),
            'relative bg-surface flex flex-col items-center gap-sm border-outline-variant border outline-none rounded-lg',
            'shadow-drop-sm'
          )}
        >
          <textarea
            autoFocus
            value={inputValue}
            className={cn(
              'w-full cursor-auto border-none active:border-none ring-none focus:ring-0 hover:ring-0 outline-none',
              'h-[1.5rem] max-h-[120px] overflow-y-auto resize-none'
            )}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              onChangeInputValue(e.target.value);
              onChange?.(e);
            }}
            onBlur={(e) => onBlur?.(e)}
            ref={ref}
            disabled={disabled}
            {...props}
          />

          <div className="flex flex-row justify-between w-full">
            {autoApply !== undefined && setAutoApply !== undefined ? (
              <Checkbox
                label="Auto Apply Suggestions"
                padding="p-2xs"
                checked={autoApply}
                labelClassName="text-on-surface-muted"
                labelVariant="label-medium"
                onCheckedChange={setAutoApply}
              />
            ) : (
              <Typography variant="body-small">GTM-1 Omni</Typography>
            )}
            <div className="flex flex-row items-center gap-2xs">
              <Popover>
                <PopoverTrigger asChild>
                  <IconButton variant="ghost" size="sm" icon={Paperclip} aria-label="attachments" />
                </PopoverTrigger>
                <PopoverContent className="py-xs w-fit px-sm">
                  <Typography variant="label-large-prominent" className="text-on-surface">
                    Attachments
                  </Typography>
                  <Typography variant="label-medium" className="text-on-surface-variant">
                    Coming Soon
                  </Typography>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    icon={Microphone}
                    aria-label="voice input"
                  />
                </PopoverTrigger>
                <PopoverContent className="py-xs w-fit px-sm">
                  <Typography variant="label-large-prominent" className="text-on-surface">
                    Voice Input
                  </Typography>
                  <Typography variant="label-medium" className="text-on-surface-variant">
                    Coming Soon
                  </Typography>
                </PopoverContent>
              </Popover>
              <IconButton
                type="submit"
                size="sm"
                aria-label="submit"
                variant="primary"
                disabled={disabled}
                icon={ArrowUp}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
);
ChatTextarea.displayName = 'ChatTextarea';

const GrowingTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, onChange, onBlur, disabled, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          inputStyling({ className, error, addPadding: false }),
          'resize-none w-full cursor-auto max-h-[200px] overflow-y-auto'
        )}
        onChange={(e) => {
          // Auto-grow logic
          e.target.style.height = 'auto';
          const newHeight = Math.min(e.target.scrollHeight, 200); // Cap at max height
          e.target.style.height = `${newHeight}px`;
          onChange?.(e);
        }}
        onBlur={(e) => onBlur?.(e)}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  }
);
GrowingTextarea.displayName = 'GrowingTextarea';

export interface LabelTextareaProps extends TextareaProps {
  label: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

const LabelTextarea = React.forwardRef<HTMLTextAreaElement, LabelTextareaProps>(
  ({ label, error, errorMessage, disabled, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-2xs', containerClassName)}>
        <Typography
          variant="label-medium"
          className={cn('text-on-surface-muted', disabled && 'opacity-50')}
        >
          {label}
        </Typography>
        <Textarea
          error={error}
          disabled={disabled}
          ref={ref}
          errorMessage={errorMessage}
          {...props}
        />
      </div>
    );
  }
);
LabelTextarea.displayName = 'LabelTextarea';

export { Textarea, LabelTextarea, ChatTextarea, GrowingTextarea };
