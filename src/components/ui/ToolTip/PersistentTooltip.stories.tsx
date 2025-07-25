import type { Meta, StoryObj } from '@storybook/react';
import { PersistentTooltip } from './PersistentTooltip';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/PersistentTooltip',
  component: PersistentTooltip,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Tooltip Title',
    description: 'This is a persistent tooltip that stays open until explicitly closed.',
    closeBtnText: 'Got it',
    children: <Button>Hover me</Button>,
  },
} satisfies Meta<typeof PersistentTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TopPlacement: Story = {
  args: {
    side: 'top',
  },
};

export const LeftPlacement: Story = {
  args: {
    side: 'left',
  },
};

export const RightPlacement: Story = {
  args: {
    side: 'right',
  },
};

export const CustomContent: Story = {
  args: {
    title: 'New Feature Available!',
    description: 'Check out our latest feature that helps you be more productive.',
    closeBtnText: 'Dismiss',
  },
};
