import { ColumnDef } from '@tanstack/react-table';
import { createSelectColumn } from 'src/components/ui/Table';
import { Typography } from 'src/components/ui/Typography/Typography';

export type NestedData = {
  id: string;
  name: string;
  email: string;
};

export type ExamplePerson = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  children: NestedData[];
};

export const columns = [
  createSelectColumn(),
  {
    id: 'name',
    header: 'Name',
    cell: ({ row }) => (
      // you can have any html elements here
      <div className="flex items-center gap-xs">
        <button
          {...{
            onClick: () => {
              row.toggleExpanded();
            },
          }}
        >
          {row.getIsExpanded() ? '👇' : '👉'}
        </button>{' '}
        <Typography variant="body-small">{row.original.name}</Typography>
      </div>
    ),
  },
  {
    id: 'email',
    header: 'Email',
    cell: ({ row }) => row.original.email,
  },
  {
    id: 'role',
    header: 'Role',
    cell: ({ row }) => row.original.role,
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => row.original.status,
  },
  {
    id: 'lastActive',
    header: 'Last Active',
    cell: ({ row }) => row.original.lastActive,
  },
] as ColumnDef<ExamplePerson>[];

export const nextedColumns = [
  {
    id: 'id',
    header: 'id',
    cell: ({ row }) => <Typography variant="body-small">{row.original.id}</Typography>,
  },
  {
    id: 'name',
    header: 'Name',
    cell: ({ row }) => <Typography variant="body-small">{row.original.name}</Typography>,
  },
  {
    id: 'email',
    header: 'Email',
    cell: ({ row }) => <Typography variant="body-small">{row.original.email}</Typography>,
  },
] as ColumnDef<NestedData>[];

export const exampleData: ExamplePerson[] = [
  {
    id: '728ed52f',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Developer',
    status: 'active',
    lastActive: '2023-11-01T10:30:00Z',
    children: [
      {
        id: '728ed52f',
        name: 'John Smith',
        email: 'john.smith@example.com',
      },
    ],
  },
  {
    id: '489e1d42',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'Designer',
    status: 'active',
    lastActive: '2023-11-02T09:15:00Z',
    children: [
      {
        id: '728ed52f',
        name: 'John Smith',
        email: 'john.smith@example.com',
      },
    ],
  },
  {
    id: '573ac21e',
    name: 'Michael Brown',
    email: 'm.brown@example.com',
    role: 'Manager',
    status: 'inactive',
    lastActive: '2023-10-28T16:45:00Z',
    children: [
      {
        id: '728ed52f',
        name: 'John Smith',
        email: 'john.smith@example.com',
      },
    ],
  },
  {
    id: '934bd67a',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    role: 'Developer',
    status: 'active',
    lastActive: '2023-11-01T14:20:00Z',
    children: [
      {
        id: '728ed52f',
        name: 'John Smith',
        email: 'john.smith@example.com',
      },
    ],
  },
  {
    id: '182cf93b',
    name: 'David Wilson',
    email: 'd.wilson@example.com',
    role: 'Designer',
    status: 'inactive',
    lastActive: '2023-10-30T11:10:00Z',
    children: [
      {
        id: '728ed52f',
        name: 'John Smith',
        email: 'john.smith@example.com',
      },
    ],
  },
] as ExamplePerson[];
