import * as React from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from 'src/components/ui/Command';
import { Command as CommandPrimitive } from 'cmdk';
import { inputStyling } from '../Input';
import { cn } from 'src/utils/tw.utils';
import { Typography } from 'src/components/ui/Typography';
import { SelectOption, uniqueOptions } from './utils';
import { IconButton } from '../Button';
import { XCircle } from '@phosphor-icons/react';
import { Tag } from '../Tag';

export type OptionItem = {
  label: string;
  value: string;
};

export interface MultiSelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  className?: string;
  initialSearchValue?: string;
  freeSolo?: boolean;
  loading?: boolean;
  onSearchChange?: (search: string) => void;
  selectedOptions: SelectOption[];
  setSelectedOptions: (options: SelectOption[]) => void;
  showMaxSelected: number;
  inputClassName?: string;
  addDivider?: (option: SelectOption) => boolean;
  disabled?: boolean;
}

export function MultiSelect({
  placeholder = 'Search...',
  options,
  label,
  className,
  initialSearchValue = '',
  loading,
  freeSolo,
  onSearchChange,
  selectedOptions,
  showMaxSelected = 3,
  setSelectedOptions,
  inputClassName,
  addDivider,
  disabled = false,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(initialSearchValue);
  const [selectedItem, setSelectedItem] = React.useState('');

  const commandListRef = React.useRef<HTMLDivElement>(null);

  const handleUnselect = (option: SelectOption) => {
    setSelectedOptions(selectedOptions.filter((s) => s.value !== option.value));
  };

  const uniqueOptionsList = uniqueOptions(options);
  const selectedValues = selectedOptions.map((s) => s.value);
  const selectableOptions = uniqueOptionsList.filter(
    // @ts-ignore
    (option) =>
      !selectedValues.includes(option.value) &&
      option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const prevOpenRef = React.useRef(open);
  React.useEffect(() => {
    const isFirstOpen = open && !prevOpenRef.current;
    const optionsChangedWhileClosed = !open && selectableOptions.length > 0;

    if (isFirstOpen || optionsChangedWhileClosed) {
      if (selectableOptions.length > 0) {
        setSelectedItem(selectableOptions[0].value);
      } else if (freeSolo && inputValue.trim()) {
        setSelectedItem('add-new-item');
      } else {
        setSelectedItem('');
      }
    }

    prevOpenRef.current = open;
  }, [selectableOptions, freeSolo, inputValue, open]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;

      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input?.value === '') {
            setSelectedOptions(selectedOptions.slice(0, -1));
          }
        }

        if (e.key === 'Enter' && freeSolo && inputValue.trim() && selectedItem === 'add-new-item') {
          e.preventDefault();
          const newOption = {
            value: inputValue.toLowerCase(),
            label: inputValue.trim(),
          };
          setSelectedOptions([...selectedOptions, newOption]);
          setInputValue('');
          onSearchChange?.('');
        }

        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [freeSolo, inputValue, selectedOptions, setSelectedOptions, onSearchChange, selectedItem]
  );

  return (
    <div className={cn('flex flex-col gap-2xs', disabled && 'pointer-events-none opacity-50')}>
      {label && (
        <Typography variant="label-medium" className="pl-2xs">
          {label}
        </Typography>
      )}
      <Command
        onKeyDown={handleKeyDown}
        className={cn('overflow-visible bg-transparent', className)}
        shouldFilter={false}
        value={selectedItem}
        onValueChange={setSelectedItem}
        loop
      >
        <div
          className={cn(
            inputStyling({ addPadding: false, className: inputClassName }),
            'flex items-center'
          )}
        >
          <div
            className={cn(
              'flex w-full flex-wrap gap-2xs',
              selectedOptions.length > 0 && 'pr-[24px]'
            )}
          >
            {(selectedOptions ?? [])
              .slice(0, open ? selectedOptions.length : showMaxSelected)
              .map((option) => {
                return (
                  <Tag
                    key={option.value}
                    label={option.label}
                    onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
                    onClick={() => {
                      handleUnselect(option);
                    }}
                    variant="default"
                    labelClassName="max-w-[180px]"
                    rightIcon={XCircle}
                  />
                );
              })}
            {selectedOptions.length > showMaxSelected && !open && (
              <Tag
                label={`+${selectedOptions.length - showMaxSelected}`}
                variant="default"
                labelClassName="max-w-[180px]"
                onClick={() => {
                  // Delay the focus to occur after the click event has been processed
                  setTimeout(() => {
                    inputRef.current?.focus();
                  }, 0);
                }}
              />
            )}
            {/* Avoid having the "Search" Icon */}
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={(e) => {
                setInputValue(e);
                onSearchChange?.(e);
                commandListRef.current?.scrollTo({
                  top: 0,
                  behavior: 'instant',
                });
              }}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              className="flex-1 bg-transparent border-0 outline-none placeholder:text-on-surface-muted"
            />
            {selectedOptions.length > 0 && (
              <IconButton
                size="sm"
                variant="ghost"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-container-high"
                onClick={() => {
                  setInputValue('');
                  setSelectedOptions([]);
                }}
                icon={XCircle}
              />
            )}
          </div>
        </div>

        <div className="relative mt-2xs">
          <CommandList
            ref={commandListRef}
            className={cn(
              'p-2xs border border-outline-variant bg-surface overflow-y-auto max-h-[200px]',
              'rounded-md absolute top-0 z-50 w-full shadow-md outline-none',
              open ? 'animate-in opacity-100' : 'opacity-0 pointer-events-none'
            )}
          >
            <CommandGroup className="h-full overflow-auto">
              {selectableOptions.length > 0 &&
                // @ts-ignore
                selectableOptions.map((option) => {
                  const shouldAddDivider = addDivider?.(option);
                  return (
                    <React.Fragment key={option.value}>
                      {shouldAddDivider && <CommandSeparator />}
                      <CommandItem
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => {
                          setInputValue('');
                          onSearchChange?.('');
                          setSelectedOptions([...selectedOptions, option]);
                        }}
                        className={'cursor-pointer'}
                        value={option.value}
                      >
                        {option.label}
                        {/* Hidden value to be used for filtering */}
                        <span className="hidden">{option.value}</span>
                      </CommandItem>
                    </React.Fragment>
                  );
                })}

              {freeSolo && inputValue.trim() && !loading && (
                <CommandItem
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    const newOption = {
                      value: inputValue.toLowerCase(),
                      label: inputValue.trim(),
                    };
                    setSelectedOptions([...selectedOptions, newOption]);
                    setInputValue('');
                    onSearchChange?.('');
                  }}
                  className={'cursor-pointer'}
                  value="add-new-item"
                >
                  Add &quot;{inputValue}&quot;
                </CommandItem>
              )}

              {loading && (
                <CommandEmpty
                  className={
                    'pointer-events-none px-xs py-2xs customtext-label-medium text-on-surface-variant'
                  }
                >
                  Loading...
                </CommandEmpty>
              )}

              {!loading && selectableOptions.length === 0 && !freeSolo && (
                <CommandEmpty
                  className={
                    'pointer-events-none px-xs py-2xs customtext-label-medium text-on-surface-variant'
                  }
                >
                  No results found
                </CommandEmpty>
              )}

              {!loading && selectableOptions.length === 0 && freeSolo && !inputValue.trim() && (
                <CommandEmpty
                  className={
                    'pointer-events-none px-xs py-2xs customtext-label-medium text-on-surface-variant'
                  }
                >
                  Start typing to add
                </CommandEmpty>
              )}
            </CommandGroup>
          </CommandList>
        </div>
      </Command>
    </div>
  );
}
