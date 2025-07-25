import type { Meta, StoryObj } from '@storybook/react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import { GeneralTable, TableContainer } from './GeneralTable';
import { CustomTable } from './Table';
import { ServerSideDataTablePagination } from './helpers/data-table-pagination';
import { createSelectColumn } from './helpers/data-table-select-column';
import { Typography } from '../Typography/Typography';
import React from 'react';
import { ExampleNestedTable, ExampleTable } from './example/example-table';
import {
  exampleData,
  ExamplePerson,
  columns as exampleColumns,
  nextedColumns,
} from './example/columns';
import { DEFAULT_COL_SETTINGS } from './helpers/default-column-size';

const meta: Meta<typeof CustomTable> = {
  title: 'Composite-UI/GeneralTable',
  component: CustomTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GeneralTable>;

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
};

const defaultData: Person[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    visits: 10,
    status: 'Active',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    age: 25,
    visits: 15,
    status: 'Inactive',
  },
  {
    firstName: 'Bob',
    lastName: 'Johnson',
    age: 45,
    visits: 20,
    status: 'Active',
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  createSelectColumn(),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('visits', {
    header: 'Visits',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => info.getValue(),
  }),
];

export const Default: Story = {
  render: () => {
    const TableExample = () => {
      const table = useReactTable<Person>({
        data: defaultData,
        columns: columns as ColumnDef<Person>[],
        state: { pagination: { pageIndex: 0, pageSize: 10 } },
        getCoreRowModel: getCoreRowModel(),
      });

      return (
        <TableContainer>
          <GeneralTable table={table} columns={columns as ColumnDef<Person>[]} />
          <ServerSideDataTablePagination
            table={table}
            overrideTotalRows={defaultData.length}
            currentPage={0}
          />
        </TableContainer>
      );
    };

    return <TableExample />;
  },
};

export const EmptyLoadingState: Story = {
  render: () => {
    const TableExample = () => {
      const table = useReactTable<Person>({
        data: [],
        state: { pagination: { pageIndex: 0, pageSize: 10 } },
        columns: columns as ColumnDef<Person>[],
        getCoreRowModel: getCoreRowModel(),
      });

      return (
        <TableContainer>
          <GeneralTable loading={true} table={table} columns={columns as ColumnDef<Person>[]} />
          <ServerSideDataTablePagination table={table} overrideTotalRows={0} currentPage={0} />
        </TableContainer>
      );
    };

    return <TableExample />;
  },
};

export const EmptyState: Story = {
  render: () => {
    const TableExample = () => {
      const table = useReactTable<Person>({
        data: [],
        columns: columns as ColumnDef<Person>[],
        state: { pagination: { pageIndex: 0, pageSize: 10 } },
        getCoreRowModel: getCoreRowModel(),
      });

      return (
        <TableContainer>
          <GeneralTable table={table} columns={columns as ColumnDef<Person>[]} />
          <ServerSideDataTablePagination table={table} overrideTotalRows={0} currentPage={0} />
        </TableContainer>
      );
    };

    return <TableExample />;
  },
};

export const MoreComplicatedExample: Story = {
  render: () => {
    const Example = () => {
      // you can define your own state here, or let the table handle it
      const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
      });

      return (
        <ExampleTable
          columns={exampleColumns as ColumnDef<ExamplePerson>[]}
          data={exampleData}
          totalCount={exampleData.length}
          pagination={pagination}
          setPagination={setPagination}
        />
      );
    };

    return (
      <div>
        <Typography variant="body-small" className="mb-md">
          <code className="text-xs pl-xs">
            In actual usage, you would have a folder with the following files:
            <div className="text-on-primary-container rounded-sm p-xs">
              <div>company_table (table folder)</div>
              <div className="text-xs pl-xs"> - columns.tsx</div>
              <div className="text-xs pl-xs"> - data-table-toolbar.tsx</div>
              <div className="text-xs pl-xs"> - data-table.tsx</div>
              <div className="text-xs pl-xs"> - schema.ts (optional)</div>
            </div>
            columns.tsx would export the columns array, and data-table.tsx would export the table
            component. Each table would have its own folder with the above files, and have its own
            toolbar, columns, and table component. Check <b>example</b> folder for an example of
            this.
          </code>
        </Typography>
        <Example />
      </div>
    );
  },
};

export const ExpandedTableExample: Story = {
  render: () => {
    const Example = () => {
      const [rowSelection, setRowSelection] = React.useState({});

      // Each react table will be slightly different, so you will need to customize the table for each use case
      const table = useReactTable({
        data: exampleData,
        columns: exampleColumns as ColumnDef<ExamplePerson>[],
        manualPagination: true,
        defaultColumn: DEFAULT_COL_SETTINGS,
        columnResizeDirection: 'ltr',
        columnResizeMode: 'onChange',
        enableExpanding: true,
        enableColumnPinning: true,
        enableColumnResizing: true,
        state: { rowSelection, columnPinning: { left: ['select'] } },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
      });

      return (
        <TableContainer>
          <GeneralTable
            table={table}
            columns={columns as ColumnDef<ExamplePerson>[]}
            renderInnerTable={(row) => {
              return <ExampleNestedTable columns={nextedColumns} data={row.original.children} />;
            }}
          />
        </TableContainer>
      );
    };

    return (
      <div>
        <Typography variant="body-small" className="mb-md">
          <code className="text-xs pl-xs">
            You can have anything in the expanded row. It will be rendered in the same container as
            the table via `renderInnerTable`
          </code>
        </Typography>
        <Example />
      </div>
    );
  },
};
