import * as React from 'react';
import { Command, CommandGroup, CommandItem, CommandList } from 'src/components/ui/Command';
import { CommandEmpty } from 'cmdk';
import { Input } from '../Input';
import { cn } from 'src/utils/tw.utils';
import { Typography } from 'src/components/ui/Typography';
import { uniqueOptions } from './utils';
import { Icon } from '@phosphor-icons/react';
import { unwrapIcon } from '../Icon';

export type SelectOption = {
  value: string;
  label: string;
  displayLabel?: string;
  icon?: Icon;
};

export interface SearchSelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  initialFilteredOptions?: SelectOption[];
  className?: string;
  listClassName?: string;
  initialSearchValue?: string;
  value?: SelectOption;
  loading?: boolean;
  onSearchChange?: (search: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  onChange?: (option: SelectOption | undefined) => void;
  onFocus?: () => void;
  clickOpen?: boolean;
  disabled?: boolean;
  leadingIcon?: boolean;
}

export function SearchSelect({
  placeholder = 'Search...',
  options,
  initialFilteredOptions,
  label,
  className,
  value,
  loading,
  onSearchChange,
  onChange,
  inputValue,
  setInputValue,
  clickOpen = false,
  listClassName,
  disabled = false,
  leadingIcon = false,
  onFocus,
}: SearchSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const hasFocused = React.useRef(false);
  const focusedOption = React.useRef<SelectOption | null>(null);

  const handleSelect = React.useCallback(
    (option: SelectOption) => {
      onChange?.(option);
      setInputValue(option.displayLabel ? option.displayLabel : option.label.toString());
      setOpen(false);
    },
    [onChange, setInputValue]
  );

  const handleClear = React.useCallback(() => {
    onChange?.(undefined);
    setInputValue('');
  }, [onChange, setInputValue]);

  const filteredOptions = React.useMemo(() => {
    if (initialFilteredOptions !== undefined) {
      return initialFilteredOptions;
    }

    return uniqueOptions(
      options.filter((option) => {
        if (options.length === 0) return false;
        if (!option.label) return false;
        if (!inputValue) return true;
        return option.label.toString().toLowerCase().includes(inputValue.toLowerCase());
      })
    );
  }, [initialFilteredOptions, options, inputValue]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;

      const hanldeEnter = () => {
        e.preventDefault();

        if (focusedOption.current) {
          const elementInFilt = filteredOptions.find(
            (v) => v.value === focusedOption.current?.value
          );

          elementInFilt && handleSelect(elementInFilt);
        } else {
          const firstFiltered = filteredOptions[0];
          firstFiltered && handleSelect(firstFiltered);
        }
      };

      if (input) {
        if ((e.key === 'Delete' || e.key === 'Backspace') && value) {
          handleClear();
        }
        if (e.key === 'Escape') {
          input.blur();
        }
        if (e.key === 'Enter') {
          hanldeEnter();
        }
      }
    },
    [value, handleClear, handleSelect, filteredOptions]
  );

  const handleOptionHover = React.useCallback((option: SelectOption | null) => {
    focusedOption.current = option;
  }, []);

  return (
    <div className="flex flex-col gap-2xs">
      {label && (
        <Typography variant="label-medium" className="pl-2xs">
          {label}
        </Typography>
      )}
      <Command
        onKeyDown={handleKeyDown}
        className={cn('overflow-visible bg-transparent', className)}
      >
        <Input
          ref={inputRef}
          value={inputValue}
          onClear={handleClear}
          onChange={(e) => {
            setInputValue(e.target.value);
            onSearchChange?.(e.target.value);
            inputRef.current?.focus();
          }}
          disabled={disabled}
          onClick={() => {
            if (clickOpen) {
              setOpen(true);
            }
          }}
          onBlur={() => {
            setOpen(false);
            if (!value) {
              setInputValue('');
            }
          }}
          onFocus={() => {
            // to prevent open on initial focus(e.g modal open)
            if (!clickOpen || hasFocused.current) {
              setOpen(true);
            }
            hasFocused.current = true;
            onFocus?.();
          }}
          placeholder={placeholder}
          preventEnter
          leadingIcon={leadingIcon ? 'search' : undefined}
        />
        <div className="relative mt-2xs">
          <CommandList>
            {open ? (
              <div
                className={cn(
                  'p-2xs border border-outline-variant bg-surface overflow-y-auto max-h-[400px]',
                  'rounded-md absolute top-0 z-10 w-full shadow-md outline-none animate-in',
                  listClassName
                )}
                onMouseDown={(e) => {
                  // prevent input onBlur when clicking scroll bar
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <CommandGroup className="h-full overflow-auto">
                  {filteredOptions.map((option) => {
                    return (
                      <CommandItem
                        key={`${option.value}-${option.label}`}
                        value={option.value + ' ' + option.label}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onMouseEnter={() => handleOptionHover(option)}
                        aria-selected={option.value === value?.value}
                        onSelect={() => handleSelect(option)}
                        className={'cursor-pointer'}
                      >
                        {
                          // @ts-ignore
                          option.icon && unwrapIcon(option.icon)
                        }
                        {option.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <div className="px-xs py-2xs customtext-label-medium text-on-surface-variant">
                  <CommandEmpty className={'pointer-events-none'}>
                    {loading ? 'Loading...' : 'No results found'}
                  </CommandEmpty>
                </div>
              </div>
            ) : null}
          </CommandList>
        </div>
      </Command>
    </div>
  );
}
