import { useState, useMemo, useEffect, useRef } from 'react';
import { Typography } from 'src/components/ui/Typography';
import { Checkbox } from '../Checkbox';
import { cn } from 'src/utils/tw.utils';
import { Badge } from '../Badge';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from '../Button';
import { Input } from '../Input';
import type { FilterProps, FilterType, FilterValueMap } from './constants';
import { getFilterIcon, getFilterLabel } from './utils';
import { safeGetItem, safeSetItem } from 'src/utils/localStorage';

function isLsFeatureAllowed(type: FilterType) {
  // localStorage feature is restricted for the USER filter due to several reasons:
  //   - USER filter must be excluded from the initial request.
  //     so the backend returns all available users (unfiltered).
  //   - Current user is preselected by default on page load.
  //   - It may cause bugs if current user is admin and switching between users.
  return type !== 'USER';
}

export function FilterDropdown<T extends FilterType>({
  id,
  filter: { type, options, selectedOptions, setSelectedOptions },
  clearAllTitle,
  clearFilter,
  hasSetInitialFilter = true,
  applyOnClick = true,
}: {
  /**
   * see FilterBarProps.id field
   */
  readonly id?: string;

  /**
   * see FilterBarProps.id field
   */
  readonly hasSetInitialFilter?: boolean;

  readonly filter: FilterProps<T>;
  readonly clearAllTitle: string;
  readonly clearFilter: (t: FilterType) => void;

  /**
   * when true - Apply filters on option click
   * when false - Apply filters on dropdown close
   */
  readonly applyOnClick?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [sortedOptions, setSortedOptions] = useState<FilterProps<T>['options']>([]);
  const [currentSelection, setCurrentSelection] = useState<FilterValueMap[T][]>([]);
  const [searchValue, setSearchValue] = useState('');

  // useRef instead of useState cz useRef does not trigger rerender.
  const initialFiltersApplied = useRef(false);

  // useRef instead of useState cz useRef does not trigger rerender.
  const sortApplied = useRef(false);

  /**
   * Apply initial filters from localStorage when:
   */
  if (
    // 1. LS feature enabled for this filter
    id &&
    // 2. only once
    !initialFiltersApplied.current &&
    // 3. after hasSetInitialFilter set to true
    hasSetInitialFilter &&
    // 4. for allowed filters only
    isLsFeatureAllowed(type)
  ) {
    const next = safeGetItem(`${id}_${type}`, selectedOptions);
    setCurrentSelection(next);
    if (applyOnClick) {
      setSelectedOptions(next);
    }
    initialFiltersApplied.current = true;
  }

  useEffect(() => {
    if (open) {
      // sort only first time when dropdown opened.
      // do not sort on user selection.
      if (!sortApplied.current) {
        setSortedOptions(
          [...options].sort((a) =>
            // selected option goes on top
            selectedOptions.find((so) => so === a.value) ? -1 : 1
          )
        );
        sortApplied.current = true;
      }

      setCurrentSelection([...selectedOptions]);
    }
  }, [open, selectedOptions]);

  const filteredOptions = useMemo(
    () =>
      searchValue.length > 2
        ? sortedOptions.filter((o) => o.label.toLowerCase().includes(searchValue.toLowerCase()))
        : sortedOptions,
    [searchValue, sortedOptions]
  );

  const setOpened = (b: boolean, clear?: boolean) => {
    if (!b) {
      sortApplied.current = false;

      // setSelectedOptions only when dropdown closed
      const next = clear ? [] : [...currentSelection];

      setSelectedOptions(next);

      if (id && isLsFeatureAllowed(type)) {
        safeSetItem(`${id}_${type}`, next);
      }

      setCurrentSelection([]);
      setSearchValue('');
    }
    setOpen(b);
  };

  const Icon = getFilterIcon(type);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpened}>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            'flex items-center bg-surface border rounded border-outline-variant p-2 outline-none hover:bg-surface-active cursor-pointer',
            open ? 'border-outline-accent' : ''
          )}
          onClick={() => setOpened(!open)}
        >
          <Icon size={12} className="text-on-surface-variant mr-1" />
          <Typography
            variant="label-medium"
            className="text-on-surface-variant after:content-['|'] after:text-blue-300 after:ml-1"
          >
            {getFilterLabel(type)}
          </Typography>
          <div className="pl-2xs flex gap-1">
            {selectedOptions.length > 0 ? (
              selectedOptions.length > 2 ? (
                <Badge variant="brand" label={`${selectedOptions.length} selected`} />
              ) : (
                selectedOptions.map((so) => (
                  /**
                   * 185px to fit date "Apr 30, 2025 - May 06, 2025" content inside a badge without being truncated.
                   * Any other values with more width will be truncated with ... at the end.
                   */
                  <Badge
                    key={so.toString()}
                    variant="brand"
                    label={options.find((o) => o.value === so)?.label || so.toString()}
                    className="max-w-[185px]"
                    textBadge
                  />
                ))
              )
            ) : (
              <Typography variant="body-medium" className="text-on-surface-muted">
                Choose...
              </Typography>
            )}
          </div>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-surface shadow-md border rounded border-outline-variant mt-xs cursor-pointer min-w-[200px]"
          align="start"
        >
          {sortedOptions.length > 5 && (
            <Input
              leadingIcon="search"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              wrapperClassName="m-xs"
              className="h-[40px] "
            />
          )}
          <div
            className="overflow-auto"
            style={{ maxHeight: 'calc(100vh - 550px)', minHeight: '150px' }}
          >
            {filteredOptions.map((option) => (
              <DropdownMenu.Item
                key={option.value.toString()}
                className="m-xs p-2xs hover:bg-primary-container-hover outline-none"
                onSelect={(e) => e.preventDefault()}
                onClick={() => {
                  const next = currentSelection.includes(option.value)
                    ? currentSelection.filter((so) => so !== option.value)
                    : [...currentSelection, option.value];

                  setCurrentSelection(next);
                  if (applyOnClick) {
                    setSelectedOptions(next);
                  }

                  if (id && isLsFeatureAllowed(type)) {
                    safeSetItem(`${id}_${type}`, next);
                  }
                }}
              >
                <Checkbox
                  checked={currentSelection.includes(option.value)}
                  label={option.label}
                  labelVariant="body-medium"
                  labelClassName="text-on-surface-variant truncate max-w-[400px]"
                />
              </DropdownMenu.Item>
            ))}
          </div>
          <DropdownMenu.Separator className="m-[5px] h-px bg-outline-variant" />
          <Button
            variant="text"
            size="text"
            className="m-md ml-auto"
            display="block"
            onClick={() => {
              clearFilter(type);
              setOpened(false, true);
            }}
          >
            {clearAllTitle}
          </Button>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
