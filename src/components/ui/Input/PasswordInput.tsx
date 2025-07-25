import { forwardRef, useState, MouseEvent, useRef } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { LabelInput, LabelInputProps, Input, InputProps } from 'src/components/ui/Input';
import { IconButton } from 'src/components/ui/Button';
import { cn } from 'src/utils/tw.utils';

export const PasswordInput = forwardRef(
  (
    { value, label, ...props }: LabelInputProps | InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClickShowPassword = () => {
      const input = ref && 'current' in ref ? ref.current : inputRef.current;
      const selectionStart = input?.selectionStart;
      const selectionEnd = input?.selectionEnd;

      setShowPassword((show) => !show);

      setTimeout(() => {
        if (input && selectionStart !== undefined && selectionEnd !== undefined) {
          input.setSelectionRange(selectionStart, selectionEnd);
        }
      }, 0);
    };

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const Comp = label ? LabelInput : Input;

    return (
      <div className="relative w-full">
        <Comp
          type={showPassword ? 'text' : 'password'}
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            inputRef.current = node;
          }}
          autoComplete="current-password"
          label={label ?? ''}
          value={value}
          {...props}
          preventEnter
        />
        <IconButton
          variant="ghost"
          className={cn(
            'transition-all absolute top-1/2 -translate-y-1/2',
            value ? 'right-[34px]' : 'right-[10px]',
            props.error && 'absolute top-1/3',
            label && 'absolute top-2/3'
          )}
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          icon={showPassword ? EyeSlash : Eye}
          size="sm"
        />
      </div>
    );
  }
);
