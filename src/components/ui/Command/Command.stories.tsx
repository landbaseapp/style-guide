import type { Meta, StoryObj } from '@storybook/react';
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from './Command';
import { Typography } from '../Typography/Typography';

const meta = {
  title: 'Components/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-xs">
      <Typography variant="label-large">
        Command is mostly used for multi-select search dropdowns
      </Typography>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Other">
            <CommandItem>Help</CommandItem>
            <CommandItem>About</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};
