import type { Meta, StoryObj } from '@storybook/react';
import { CustomTable, TableHeader, TableBody, TableRow, TableCell, TableHead } from './Table';
import { TruncatedToolTipCell, TruncatedPopoverCell, AvatarCell } from './TableCells';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const meta: Meta<typeof CustomTable> = {
  title: 'Components/Table',
  component: CustomTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CustomTable>;

const longText =
  'This is a very long text that will be truncated in the table cell. It contains more than 50 characters to demonstrate the truncation functionality. This text is long enough to trigger the line-clamp and show the "Show more" indicator.';
const avatarName = 'John Doe';
const avatarSubtext = 'Software Engineer';

type Data = {
  tooltip: string;
  popover: string;
  avatar: { name: string; subtext?: string };
};

const columnHelper = createColumnHelper<Data>();

const columns = [
  columnHelper.accessor('tooltip', {
    header: 'Truncated Tooltip Cell',
    cell: (info) => <TruncatedToolTipCell items={info.getValue()} limit={50} />,
    size: 100,
  }),
  columnHelper.accessor('popover', {
    header: 'Truncated Popover Cell',
    cell: (info) => <TruncatedPopoverCell items={info.getValue()} />,
    size: 100,
  }),
  columnHelper.accessor('avatar', {
    header: 'Avatar Cell',
    cell: (info) => <AvatarCell word={info.getValue().name} subtext={info.getValue().subtext} />,
    size: 100,
  }),
];

const data: Data[] = [
  {
    tooltip: longText,
    popover: longText,
    avatar: { name: avatarName, subtext: avatarSubtext },
  },
];

const TableExample = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-[800px] overflow-auto">
      <CustomTable>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {/*
         * Render TableHeader below TableBody so that sticky header is rendered above TableBody content.
         * Using z-index is not the option cz it makes TableHeader rendered above the dropdown menus.
         */}
        <TableHeader table={table}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <TableHead key={header.id} header={header} first={index === 0} />
              ))}
            </TableRow>
          ))}
        </TableHeader>
      </CustomTable>
    </div>
  );
};

export const TableCells: Story = {
  render: () => <TableExample />,
};
