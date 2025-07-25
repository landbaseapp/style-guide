import { ToggleButton } from 'src/components/ui/Button';
import { Input } from 'src/components/ui/Input';
import { DataTableToolbar } from 'src/components/ui/Table';
import { Funnel } from '@phosphor-icons/react';
import { Updater, PaginationState } from '@tanstack/react-table';
import { FilterBar, FilterBarProps } from 'src/components/ui/Filters';

interface SearchDataTableToolbarProps {
  placeholder: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  setPagination?: (pagination: Updater<PaginationState>) => void;

  advancedSearch?: {
    open: boolean;
    onToggle: () => void;
  };
  filters?: FilterBarProps;
  action?: React.ReactNode;
}

export function SearchDataTableToolbar({
  placeholder,
  searchValue,
  setSearchValue,
  setPagination,
  advancedSearch,
  filters,
  action,
}: SearchDataTableToolbarProps) {
  return (
    <DataTableToolbar variant="top-toolbar">
      <div className="w-full">
        <div className="flex items-center gap-md justify-between">
          <div className="flex items-center gap-md">
            <Input
              leadingIcon="search"
              placeholder={placeholder}
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
                setPagination?.((prev) => ({ ...prev, pageIndex: 0 }));
              }}
              className="h-[40px] w-[150px] lg:w-[250px]"
            />
            {advancedSearch && (
              <ToggleButton
                size="sm"
                icon={Funnel}
                onClick={advancedSearch?.onToggle}
                selected={advancedSearch?.open}
              />
            )}
          </div>
          {action}
        </div>
        {filters && <FilterBar filters={filters} />}
      </div>
    </DataTableToolbar>
  );
}
