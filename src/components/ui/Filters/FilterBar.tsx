import { Button } from 'src/components/ui/Button';
import { FunnelX } from '@phosphor-icons/react';
import {
  AddFilters,
  FilterDropdown,
  type FilterProps,
  FilterBarProps,
} from 'src/components/ui/Filters';
import { useEffect, useMemo } from 'react';
import { safeGetItem, safeSetItem } from 'src/utils/localStorage';

export function FilterBar({ filters }: { filters: FilterBarProps }) {
  useEffect(
    () => {
      if (filters.id) {
        filters.setVisibleFilters(
          safeGetItem(`${filters.id}_VISIBLE_FILTERS`, filters.visibleFilters)
        );
      }
    },
    // do this one time on component load.
    // dont need to wait for the first response,
    // cz setVisibleFilters does not modifies applied filters for the back-end.
    []
  );

  const [filtersToRender, hiddenFilters] = useMemo(
    () => [
      filters.filters.filter((f) => filters.visibleFilters.includes(f.type)),
      filters.filters.filter((f) => !filters.visibleFilters.includes(f.type)).map((f) => f.type),
    ],
    [filters.filters, filters.visibleFilters]
  );

  const canRemoveFilters = filters.visibleFilters.length > filters.minFiltersAmount;

  return (
    <div className="flex flex-wrap gap-xs mt-xs">
      {filtersToRender.map((filter) => (
        <FilterDropdown
          id={filters.id}
          key={filter.type}
          hasSetInitialFilter={filters.hasSetInitialFilter}
          filter={filter as FilterProps<typeof filter.type>}
          clearFilter={(t) => {
            if (canRemoveFilters) {
              // when if condition above is true,
              // clearFilter should also hide filter under "More filters" menu.
              const next = filters.visibleFilters.filter((f) => f !== t);
              filters.setVisibleFilters(next);

              if (filters.id) {
                safeSetItem(`${filters.id}_VISIBLE_FILTERS`, next);
              }
            }
          }}
          clearAllTitle={canRemoveFilters ? 'Remove filter' : 'Clear filter'}
        />
      ))}
      {filtersToRender.length !== filters.filters.length && (
        <AddFilters
          options={hiddenFilters}
          setOptions={(v) => {
            const next = filters.filters.filter((f) => !v.includes(f.type)).map((f) => f.type);

            filters.setVisibleFilters(next);

            if (filters.id) {
              safeSetItem(`${filters.id}_VISIBLE_FILTERS`, next);
            }
          }}
        />
      )}
      <Button
        className="ml-auto"
        variant="ghost"
        leftIcon={FunnelX}
        onClick={() => {
          filters.filters.forEach((f) => {
            // reset each filter to empty values
            f.setSelectedOptions([]);

            if (filters.id) {
              safeSetItem(`${filters.id}_${f.type}`, []);
            }
          });

          const next = filters.filters.filter((f) => f.default).map((f) => f.type);
          filters.setVisibleFilters(next);

          if (filters.id) {
            safeSetItem(`${filters.id}_VISIBLE_FILTERS`, next);
          }
        }}
      >
        Clear all
      </Button>
    </div>
  );
}
