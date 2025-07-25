import { useState } from 'react';
import { Typography } from 'src/components/ui/Typography';
import { cn } from 'src/utils/tw.utils';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FilterType } from './constants';
import { getFilterIcon, getFilterLabel } from './utils';
import { unwrapIcon } from '../Icon';

export function AddFilters({
  options,
  setOptions,
}: {
  options: FilterType[];
  setOptions: (v: FilterType[]) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            'bg-surface border rounded border-outline-variant p-2 outline-none hover:bg-surface-active cursor-pointer',
            open ? 'border-outline-accent' : ''
          )}
        >
          <Typography variant="body-medium" className="text-on-surface-variant">
            More filters
          </Typography>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-surface shadow-md border rounded border-outline-variant mt-xs cursor-pointer min-w-[200px]"
          align="start"
        >
          <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 550px);' }}>
            {options.map((option) => (
              <DropdownMenu.Item
                key={option}
                className="m-xs p-2xs hover:bg-primary-container-hover outline-none"
                onClick={() => setOptions(options.filter((o) => o !== option))}
              >
                <Typography
                  variant="body-medium"
                  className="flex items-center gap-xs text-on-surface-variant"
                >
                  {unwrapIcon(getFilterIcon(option))}
                  {getFilterLabel(option)}
                </Typography>
              </DropdownMenu.Item>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
