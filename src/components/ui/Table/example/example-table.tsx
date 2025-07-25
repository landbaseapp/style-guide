import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Updater,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import * as React from 'react';
import { ExampleTableToolbar } from './data-table-toolbar';
import { GeneralTable, TableContainer } from 'src/components/ui/Table';
import { DEFAULT_COL_SETTINGS } from 'src/components/ui/Table';
import { ExamplePerson, NestedData, nextedColumns } from './columns';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount: number;
  pagination: {
    pageSize: number;
    pageIndex: number;
  };
  setPagination: (pagination: Updater<PaginationState>) => void;
}

export function ExampleTable<TData extends ExamplePerson, TValue>({
  columns,
  data,
  totalCount,
  pagination,
  setPagination,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Each react table will be slightly different, so you will need to customize the table for each use case
  // See https://tanstack.com/table/latest/docs/api/core/table#options for more information
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    rowCount: totalCount,
    defaultColumn: DEFAULT_COL_SETTINGS,
    columnResizeDirection: 'ltr',
    columnResizeMode: 'onChange',
    enableColumnPinning: true,
    enableExpanding: true,
    enableColumnResizing: true,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnPinning: {
        left: ['select'],
      },
    },
    onPaginationChange: (pagination) => {
      setPagination(pagination);
    },

    initialState: { pagination: pagination },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <TableContainer>
      <ExampleTableToolbar />
      <GeneralTable
        table={table}
        columns={columns as ColumnDef<TData>[]}
        renderInnerTable={(row) => {
          return <ExampleNestedTable columns={nextedColumns} data={row.original.children} />;
        }}
        pagination={{
          totalRows: totalCount,
          currentPage: pagination.pageIndex,
        }}
      />
    </TableContainer>
  );
}

interface NestedDataTableProps<TData extends NestedData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ExampleNestedTable<TData extends NestedData, TValue>({
  columns,
  data,
}: NestedDataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    defaultColumn: DEFAULT_COL_SETTINGS,
    columnResizeDirection: 'rtl',
    columnResizeMode: 'onChange',
    enableColumnPinning: true,
    enableColumnResizing: true,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      columnPinning: {
        left: ['select', 'name'],
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return <GeneralTable nested table={table} columns={columns as ColumnDef<TData>[]} />;
}
