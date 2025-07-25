import type { Meta, StoryObj } from '@storybook/react';
import { PageWrapper } from './PageWrapper';
import { Broadcast } from '@phosphor-icons/react';
import { Button } from '../Button';
import { Badge } from '../Badge';

const meta = {
  title: 'Composite-UI/PageWrapper',
  component: PageWrapper,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof PageWrapper>;

export default meta;
type Story = StoryObj<typeof PageWrapper>;

export const Default: Story = {
  args: {
    label: 'Page Title',
    leftSection: {
      leftIcon: Broadcast,
    },
    children: (
      <div className="flex w-[300px] h-[300px] m-md bg-red-500 items-center justify-center">
        Page Content
      </div>
    ),
  },
};

export const WithoutIcon: Story = {
  args: {
    label: 'Page Title',
    rightSection: {
      mainAction: <Button variant="accent">Action Button</Button>,
    },
    children: (
      <div className="flex w-[300px] h-[300px] m-md bg-red-500 items-center justify-center">
        Page Content
      </div>
    ),
  },
};

export const WithActionButtons: Story = {
  args: {
    label: 'Page Title',
    children: (
      <div className="flex w-[300px] h-[300px] m-md bg-red-500 items-center justify-center">
        Page Content
      </div>
    ),
    leftSection: {
      badge: <Badge label="Beta" />,
      leftIcon: Broadcast,
    },
    rightSection: {
      mainAction: <Button variant="accent">Action Button</Button>,
      secondaryAction: <Button variant="ghost">Secondary Action Button</Button>,
    },
  },
};
