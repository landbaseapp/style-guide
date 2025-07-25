import { CaretDown, CaretUp } from '@phosphor-icons/react';
import { Column } from '@tanstack/react-table';
import { IconButton } from 'src/components/ui/Button';

export function DataTableHeaderWithSorting<T>({
  label,
  column,
}: {
  label: string;
  column: Column<T>;
}) {
  return (
    <div className="flex flex-row items-center gap-xs whitespace-nowrap">
      {label}
      <IconButton
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        icon={column.getIsSorted() === 'asc' ? CaretDown : CaretUp}
      />
    </div>
  );
}
