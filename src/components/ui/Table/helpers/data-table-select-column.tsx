import { Checkbox } from 'src/components/ui/Checkbox';
import { type RowModel, type ColumnDef, type Row } from '@tanstack/react-table';

export function createSelectWithLimitColumn<T extends { id: string }>(
  setSelectAll?: (value: boolean) => void,
  isAllCheckBoxSelected?: boolean,
  rowsAvailableToSelection?: string[],
  isIcpCriteria?: boolean
): ColumnDef<T> {
  let lastSelectedIndex = 0;

  const isDisabled = (row: Row<T>) => {
    if (!isAllCheckBoxSelected || !isIcpCriteria) {
      return false;
    }
    return !rowsAvailableToSelection?.includes(row.original.id);
  };

  return {
    id: 'select',
    header: ({ table }) => {
      return (
        <div className="flex w-[20px] h-[20px] items-center justify-center">
          <Checkbox
            checked={
              isAllCheckBoxSelected ? true : table.getIsSomeRowsSelected() ? 'indeterminate' : false
            }
            onCheckedChange={(value) => {
              if (setSelectAll) setSelectAll(!!value);
              table.toggleAllPageRowsSelected(!!value);
            }}
            aria-label="Select all"
            className="bg-white"
          />
        </div>
      );
    },
    cell: ({ table, row }) => {
      return (
        <div className="flex w-[20px] h-[20px] items-center justify-center">
          <Checkbox
            disabled={isDisabled(row)}
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
            }}
            aria-label="Select row"
            className="bg-white"
            onClick={(e) => {
              const currentIndex = table.getSortedRowModel().rows.findIndex((r) => r.id === row.id);

              if (e.shiftKey) {
                const rowsToToggle = getRowRange(
                  table.getSortedRowModel(),
                  currentIndex,
                  lastSelectedIndex
                );

                const isCellSelected = row.getIsSelected();
                for (const rowToToggle of rowsToToggle) {
                  rowToToggle.toggleSelected(!isCellSelected);
                }
              }

              lastSelectedIndex = currentIndex;
              e.stopPropagation();
            }}
          />
        </div>
      );
    },
    minSize: 28,
    maxSize: 28,
    size: 28,
    enableResizing: false,
    enableSorting: false,
    enableHiding: false,
  };
}

export function createSelectColumn<T>(
  onSelect?: (value: boolean) => void,
  setSelectAll?: (value: boolean) => void
): ColumnDef<T> {
  let lastSelectedIndex = 0;
  return {
    id: 'select',
    header: ({ table }) => (
      <div className="flex w-[20px] h-[20px] items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomeRowsSelected()
              ? 'indeterminate'
              : false
          }
          onCheckedChange={(value) => {
            if (setSelectAll) setSelectAll(!!value);
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
          className="bg-white"
        />
      </div>
    ),
    cell: ({ table, row }) => {
      return (
        <div className="flex w-[20px] h-[20px] items-center justify-center">
          <Checkbox
            disabled={!row.getCanSelect()}
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              if (onSelect) onSelect(!!value);
            }}
            aria-label="Select row"
            className="bg-white"
            onClick={(e) => {
              const currentIndex = table.getSortedRowModel().rows.findIndex((r) => r.id === row.id);

              if (e.shiftKey) {
                const rowsToToggle = getRowRange(
                  table.getSortedRowModel(),
                  currentIndex,
                  lastSelectedIndex
                );

                const isCellSelected = row.getIsSelected();

                for (const rowToToggle of rowsToToggle) {
                  rowToToggle.toggleSelected(!isCellSelected);
                }
              }

              lastSelectedIndex = currentIndex;
              e.stopPropagation();
            }}
          />
        </div>
      );
    },
    minSize: 28,
    maxSize: 28,
    size: 28,
    enableResizing: false,
    enableSorting: false,
    enableHiding: false,
  };
}

export function getRowRange<T>(
  rows: RowModel<T>,
  currentIndex: number,
  selectedIndex: number
): Row<T>[] {
  const rangeStart = selectedIndex > currentIndex ? currentIndex : selectedIndex;
  const rangeEnd = rangeStart === currentIndex ? selectedIndex : currentIndex;
  return rows.rows.slice(rangeStart, rangeEnd + 1);
}
