import { IconButton } from 'src/components/ui/Button';
import type { Table } from '@tanstack/react-table';
import { DataTableToolbar } from './data-table-toolbar-container';
import { CaretCircleLeft, CaretCircleRight } from '@phosphor-icons/react';
import { Typography } from '../../Typography/Typography';
import { formatNumber } from 'src/utils/string';
import { cn } from 'src/utils/tw.utils';

interface ServerSideDataTablePaginationProps<TData> {
  table: Table<TData>;
  overrideTotalRows: number;
  currentPage: number;
  manualSelectedCount?: number;
  hideSelectIndicator?: boolean;
}

interface DataTablePaginationProps {
  overrideTotalRows?: number;
  selectedCount?: number;
  overrideSelectedCount?: number;
}

export function SelectIndicator({ overrideTotalRows, selectedCount }: DataTablePaginationProps) {
  if (!overrideTotalRows) {
    return null;
  }

  if (!selectedCount) {
    return (
      <Typography className="customtext-body-small">
        Results: {formatNumber(overrideTotalRows ?? 0)}
      </Typography>
    );
  }

  const totalRows = overrideTotalRows;

  return (
    <Typography className="flex-1 flex items-center customtext-body-small">
      {selectedCount} of {formatNumber(totalRows)} row(s) selected.
    </Typography>
  );
}

export function ServerSideDataTablePagination<TData>({
  table,
  overrideTotalRows,
  currentPage,
  manualSelectedCount,
  hideSelectIndicator,
}: ServerSideDataTablePaginationProps<TData>) {
  const totalPages = Math.ceil(overrideTotalRows / table.getState().pagination.pageSize);

  const selectedCount =
    manualSelectedCount ??
    Object.entries(table.getState().rowSelection).filter(([_, selected]) => selected).length;

  return (
    <DataTableToolbar variant="bottom-toolbar" className={cn(hideSelectIndicator && 'justify-end')}>
      {!hideSelectIndicator && (
        <div className="flex flex-row items-center gap-base">
          <SelectIndicator selectedCount={selectedCount} overrideTotalRows={overrideTotalRows} />
        </div>
      )}
      <div className="flex flex-row items-center">
        {overrideTotalRows > 0 && (
          <Typography variant="body-small" className="flex items-center justify-center">
            Showing {currentPage * table.getState().pagination.pageSize + 1}-
            {Math.min(
              (currentPage + 1) * table.getState().pagination.pageSize,
              overrideTotalRows ?? 0
            )}{' '}
            of {formatNumber(overrideTotalRows)}
          </Typography>
        )}
        <div className="flex items-center gap-xs">
          <IconButton
            variant="ghost"
            size={'md'}
            onClick={(e) => {
              table.previousPage();
              e.currentTarget.blur();
            }}
            disabled={currentPage === 0}
            icon={CaretCircleLeft}
          />
          <IconButton
            variant="ghost"
            size="md"
            onClick={(e) => {
              table.nextPage();
              e.currentTarget.blur();
            }}
            disabled={currentPage + 1 === totalPages}
            icon={CaretCircleRight}
          />
        </div>
      </div>
    </DataTableToolbar>
  );
}
