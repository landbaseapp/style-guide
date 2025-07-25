import type { Meta, StoryObj } from '@storybook/react';
import { GeneralToolTip } from './ToolTip';
import { Button } from '../Button/Button';

const meta: Meta<typeof GeneralToolTip> = {
  title: 'Components/ToolTip',
  component: GeneralToolTip,
  parameters: { layout: 'centered' },
  argTypes: {
    side: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    title: { control: 'text' },
    delay: { control: 'number' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GeneralToolTip>;

export const Default: Story = {
  args: {
    title: 'This is a tooltip, it can be used to display information about about the element.',
    children: (
      <Button variant="text" size="text">
        Hover me
      </Button>
    ),
  },
  render: (args) => (
    <div className="h-[300px] w-[300px] flex items-center justify-center">
      <GeneralToolTip {...args} />
    </div>
  ),
};

export const TopPlacement: Story = {
  args: {
    title: 'Tooltip appears on top',
    side: 'top',
    children: (
      <Button variant="text" size="text">
        Hover me
      </Button>
    ),
  },
};

export const BottomPlacement: Story = {
  args: {
    title: 'Tooltip appears on bottom',
    side: 'bottom',
    children: (
      <Button variant="text" size="text">
        Hover me
      </Button>
    ),
  },
};

export const LeftPlacement: Story = {
  args: {
    title: 'Tooltip appears on left',
    side: 'left',
    children: (
      <Button variant="text" size="text">
        Hover me
      </Button>
    ),
  },
};

export const RightPlacement: Story = {
  args: {
    title: 'Tooltip appears on right',
    side: 'right',
    children: (
      <Button variant="text" size="text">
        Hover me
      </Button>
    ),
  },
};

export const CustomDelay: Story = {
  args: {
    title: 'Tooltip with custom delay',
    delay: 1000,
    children: (
      <Button variant="text" size="text">
        Hover me (1s delay)
      </Button>
    ),
  },
};
