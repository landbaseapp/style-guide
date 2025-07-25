import React, { useRef } from 'react';
import { ColumnDef, flexRender, Row, Table } from '@tanstack/react-table';
import { TableBody, TableCell, TableHeader, TableRow } from './Table';
import { getCommonPinningStyles } from './helpers/column-pinning-styles';
import { cn } from 'src/utils/tw.utils';
import { Loading } from '../Loading/Loading';
import { ServerSideDataTablePagination } from './helpers/data-table-pagination';

export type DebounceTableColumnLoading = { column: string; isLoading: boolean }[];

export const TableContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col h-fit gap-0 rounded-lg border border-outline-variant bg-surface overflow-clip',
        className
      )}
      {...props}
    />
  );
});

export function GeneralTable<TData>({
  className,
  table,
  nested,
  columns,
  renderInnerTable,
  selectedRows,
  loading,
  onRowClick,
  emptyState,
  pagination,
  maxHeight = 280,
  debounceColumnLoading,
  hideSelectIndicator,
  noStretch = false,
}: React.HTMLAttributes<HTMLDivElement> & {
  table: Table<TData>;
  columns: ColumnDef<TData>[];
  nested?: boolean;
  renderInnerTable?: (row: Row<TData>) => React.ReactNode;
  selectedRows?: number;
  loading?: boolean;
  maxHeight?: number;
  onRowClick?: (row: TData) => void;
  emptyState?: React.ReactNode;
  pagination?: {
    totalRows: number;
    currentPage: number;
    selectedRow?: number | null;
  };
  debounceColumnLoading?: DebounceTableColumnLoading;
  hideSelectIndicator?: boolean;
  noStretch?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const tBodyRef = useRef<HTMLTableSectionElement>(null);

  /**
   * Instead of calling `column.getSize()` on every render for every header
   * and especially every data cell (very expensive),
   * we will calculate all column sizes at once at the root table level in a useMemo
   * and pass the column sizes down as CSS variables to the <table> element.
   */
  const columnSizeVars = React.useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  const rows = table.getRowModel().rows ?? [];

  const emptyRows = React.useMemo(() => {
    if (rows.length === 0 || !noStretch) {
      return [];
    }

    const tBodyHeight = tBodyRef.current?.offsetHeight ?? 0;
    const expectedRows = Math.ceil(tBodyHeight / 40);
    const needToHaveEmptyRows = expectedRows > rows.length;

    if (needToHaveEmptyRows) {
      const count = Math.floor(expectedRows - rows.length);

      return Array.from({ length: count }, (_, index) => ({
        id: `empty-row-${index}`,
      }));
    }

    return [];
  }, [rows, noStretch]);

  const debounceColumnRec = React.useMemo(() => {
    const rec = new Map<string, { isLoading: boolean }>();

    (debounceColumnLoading || []).forEach((v) => {
      rec.set(v.column, { isLoading: v.isLoading });
    });

    return rec;
  }, [debounceColumnLoading]);

  return (
    <>
      <div
        ref={ref}
        className={cn(
          nested && 'border-t border-b border-outline bg-surface',
          // Sizing hack to make scroll smooth
          `h-full max-width-[1500px] max-h-[calc(100vh-${maxHeight}px)] min-h-[100px] flex align-center`,
          'w-full overflow-x-auto relative scroll-pb-xl',
          'scrollbar-track-surface-dim scrollbar-thumb-outline-variant relative',
          className
        )}
        style={columnSizeVars}
      >
        <table className={cn('w-full caption-bottom text-sm relative', className)}>
          {emptyState && !loading && table.getRowModel().rows?.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell
                  className="sticky left-0"
                  colSpan={columns.length}
                  style={{
                    maxWidth: ref.current?.offsetWidth,
                  }}
                >
                  {emptyState}
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <>
              <TableBody ref={tBodyRef}>
                {!loading && rows.length ? (
                  <>
                    {rows.map((row) => (
                      <React.Fragment key={row.id}>
                        <TableRow
                          onClick={() => onRowClick?.(row.original)}
                          className={cn(onRowClick && 'cursor-pointer')}
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                        >
                          {row.getVisibleCells().map((cell) => {
                            const withLoading = debounceColumnRec.get(cell.column.id)?.isLoading;

                            const headContent = (
                              <div className="flex justify-between">
                                {!withLoading &&
                                  flexRender(cell.column.columnDef.cell, cell.getContext())}
                                {withLoading && (
                                  <Loading size={18} className="text-on-surface-variant" />
                                )}
                              </div>
                            );

                            return (
                              <TableCell
                                nested={nested || row.getIsExpanded()}
                                key={cell.id}
                                style={{
                                  ...getCommonPinningStyles({
                                    column: cell.column,
                                    header: false,
                                  }),
                                }}
                              >
                                {headContent}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                        {row.getIsExpanded() && renderInnerTable && (
                          <TableRow>
                            <TableCell noPadding className="px-0 py-0 m-0" colSpan={columns.length}>
                              {renderInnerTable(row)}
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                    {emptyRows.map((row) => (
                      <tr key={row.id}>
                        <td />
                      </tr>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell
                      nested={nested}
                      colSpan={columns.length}
                      className="h-24 w-full text-center"
                    >
                      <div
                        className={cn(
                          'flex justify-center items-center sticky left-0',
                          nested ? 'h-24' : 'min-h-[300px]'
                        )}
                        style={{
                          maxWidth: ref.current?.offsetWidth,
                        }}
                      >
                        {loading ? (
                          <Loading size={24} className="text-on-surface-variant" />
                        ) : (
                          'No results'
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              {/*
               * Render TableHeader below TableBody so that sticky header is rendered above TableBody content.
               * Using z-index is not the option cz it makes TableHeader rendered above the dropdown menus.
               */}
              <TableHeader table={table} />
            </>
          )}
        </table>
      </div>
      {!loading && pagination !== undefined && table.getRowModel().rows.length > 0 && (
        <ServerSideDataTablePagination
          table={table}
          overrideTotalRows={pagination.totalRows}
          currentPage={pagination.currentPage}
          manualSelectedCount={selectedRows ?? pagination.selectedRow ?? undefined}
          hideSelectIndicator={hideSelectIndicator}
        />
      )}
    </>
  );
}
