import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="text-sm flex flex-col gap-2xs">
          <h4 className="customtext-label-large">Popover Content</h4>
          <p>
            Popover is pretty basic by itself, but it will be used to build more complex components
            such as popover calendar picker or date range picker.
            <br />
            <br />
            <b> Note 1</b>: there are no components for popover title or description, so this is
            just a simple text
            <br />
            <b> Note 2</b>: You must provide a popover trigger so we know where to anchor the
            popover to.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const AlignStart: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Align Start</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="text-sm">
          <p>This popover is aligned to the start.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Align End</Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="text-sm">
          <p>This popover is aligned to the end.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
