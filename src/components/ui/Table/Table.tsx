/* eslint-disable @typescript-eslint/no-explicit-any */
import { flexRender, Header, Table as ReactTable } from '@tanstack/react-table';
import * as React from 'react';
import { cn } from 'src/utils/tw.utils';
import { getCommonPinningStyles } from 'src/components/ui/Table/helpers/column-pinning-styles';
import { Loading } from '../Loading';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table ref={ref} className={cn('w-full caption-bottom', className)} {...props} />
    </div>
  )
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { table: ReactTable<any> }
>(({ className, table, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('[&_tr]:border-b border-b sticky top-0 h-[40px]', className)}
    style={{
      // https://stackoverflow.com/questions/50361698/border-style-do-not-work-with-sticky-position-element
      boxShadow:
        'inset 0 1px 0 var(--color-outline-variant), inset 0 -1px 0 var(--color-outline-variant)',
    }}
    {...props}
  >
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header, index) => {
          return (
            <TableHead className="relative" key={header.id} header={header} first={index === 0} />
          );
        })}
      </TableRow>
    ))}
  </thead>
));

TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn('bg-primary text-primary-foreground', className)} {...props} />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { expanded?: boolean }
>(({ className, expanded, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      expanded ? 'bg-surface' : 'bg-white',
      'overflow-visible border-b transition-colors border-outline-variant data-[state=selected]:bg-state-layer-dim',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    header: Header<any, any>;
    style?: React.CSSProperties;
    className?: string;
    first?: boolean;
    withLoading?: boolean;
  }
>(({ className, header, first, withLoading = false, ...props }, ref) => {
  const content = flexRender(header.column.columnDef.header, header.getContext());

  const headContent = (
    <div className="flex justify-between">
      <div>{content}</div>
      {withLoading && <Loading size={18} className="text-on-surface-variant" />}
    </div>
  );

  return (
    <th
      className={cn(
        'text-left align-middle items-start bg-surface-dim mx-0',
        '[&:has([role=checkbox])]:pr-xs [&:has([role=checkbox])]:border-0',
        `py-2xs self-stretch`,
        className
      )}
      style={{
        ...getCommonPinningStyles({
          column: header.column,
          header: true,
        }),
      }}
    >
      <div
        ref={ref}
        className={cn(
          'customtext-label-large text-start text-on-surface-variant m-0',
          'border-l border-outline-variant self-strech items-center pl-md pr-xs',
          '[&:has([role=checkbox])]:border-0 [&:has([role=checkbox])]:pl-sm [&:has([role=checkbox])]:pr-0',
          first ? 'border-l-0' : ''
        )}
        style={{ width: header?.getSize() }}
        {...props}
      >
        {header.isPlaceholder ? null : headContent}
        <div
          onDoubleClick={() => header.column.resetSize()}
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={cn(
            header.column.getCanResize() ? 'cursor-col-resize' : 'cursor-not-allowed',
            `absolute h-full w-[5px] select-none touch-none right-0 top-0`,
            header.column.getIsResizing() ? 'opacity-100 bg-outline-accent' : 'opacity-0'
          )}
        />
      </div>
    </th>
  );
});
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    className?: string;
    nested?: boolean;
    noPadding?: boolean;
  }
>(({ className, nested, noPadding, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      className,
      nested ? 'bg-surface-container-high' : 'bg-white',
      'h-[40px]',
      noPadding
        ? 'p-0'
        : 'pl-md pr-md py-2xs [&:has([role=checkbox])]:pr-0 [&:has([role=checkbox])]:pl-sm align-middle',
      'text-on-surface-variant border-outline-variant data-[state=pinned]:bg-white',
      'items-center gap-sm self-stretch customtext-body-medium'
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

export {
  TableCell,
  TableHead,
  TableHeader,
  Table as CustomTable,
  TableBody,
  TableFooter,
  TableRow,
};
