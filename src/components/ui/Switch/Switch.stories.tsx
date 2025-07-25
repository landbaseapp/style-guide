import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from './Switch';
import { Typography } from '../Typography';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onCheckedChange: { action: 'checked changed' },
    loading: { control: 'boolean' },
  },
  args: {
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Examples: Story = {
  render: () => {
    return (
      <div className="space-y-8 w-[400px]">
        <div>
          <Typography variant="title-medium" className="mb-4">
            Switch Examples
          </Typography>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography variant="body-medium">Selected Switch</Typography>
            <Switch checked />
          </div>

          <div className="flex items-center justify-between">
            <Typography variant="body-medium">Selected With Icon</Typography>
            <Switch checked icon />
          </div>

          <div className="flex items-center justify-between">
            <Typography variant="body-medium">Selected With Label</Typography>
            <Switch checked label="Label" />
          </div>

          <div className="flex items-center justify-between">
            <Typography variant="body-medium">Disabled Selected With Icon</Typography>
            <Switch checked icon disabled />
          </div>

          <div className="flex items-center justify-between">
            <Typography variant="body-medium">Unselected Switch</Typography>
            <Switch checked={false} />
          </div>

          <div className="flex items-center justify-between">
            <Typography variant="body-medium">Unselected With Icon</Typography>
            <Switch checked={false} icon />
          </div>

          <div className="flex items-center justify-between">
            <Typography variant="body-medium">Selected With Label</Typography>
            <Switch checked={false} label="Label" />
          </div>

          <div className="flex items-center justify-between">
            <Typography variant="body-medium">Disabled Unselected Switch with Icon</Typography>
            <Switch checked={false} disabled icon />
          </div>

          <div className="flex items-center justify-between">
            <Typography variant="body-medium">Loading Switch (Must with Icon)</Typography>
            <Switch checked={true} icon loading />
          </div>
        </div>
      </div>
    );
  },
};
