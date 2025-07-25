import { DataTableToolbar } from 'src/components/ui/Table';
import { Typography } from 'src/components/ui/Typography/Typography';

export function ExampleTableToolbar() {
  return (
    <DataTableToolbar variant="top-toolbar">
      <div className="flex flex-row items-center gap-md">
        <Typography variant="label-medium">You can put whatever you want here</Typography>
      </div>
    </DataTableToolbar>
  );
}
