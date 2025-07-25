import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';
import { Button } from '../Button';
import { fn } from '@storybook/test';

const meta = {
  title: 'Composite-UI/Banner',
  component: Banner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoStory: Story = {
  args: {
    description: 'This is an info banner message',
    variant: 'info',
    onClose: fn,
    action: (
      <Button variant="text" size="text">
        Action
      </Button>
    ),
  },
  render: (args) => (
    <div className="flex flex-col gap-md">
      <Banner {...args} layout="horizontal" />
      <Banner {...args} layout="horizontal" border="bottom" />
      <Banner {...args} layout="vertical" />
      <Banner {...args} layout="vertical" border="bottom" />
    </div>
  ),
};

export const SuccessStory: Story = {
  args: {
    description: 'Operation completed successfully',
    variant: 'positive',
    onClose: fn,
    action: (
      <Button variant="text" size="text">
        Action
      </Button>
    ),
  },
  render: (args) => (
    <div className="flex flex-col gap-md">
      <Banner {...args} layout="horizontal" />
      <Banner {...args} layout="horizontal" border="bottom" />
      <Banner {...args} layout="vertical" />
      <Banner {...args} layout="vertical" border="bottom" />
    </div>
  ),
};

export const WarningStory: Story = {
  args: {
    description: 'Please review this warning message',
    variant: 'warning',
    onClose: fn,
    action: (
      <Button variant="text" size="text">
        Action
      </Button>
    ),
  },
  render: (args) => (
    <div className="flex flex-col gap-md">
      <Banner {...args} layout="horizontal" />
      <Banner {...args} layout="horizontal" border="bottom" />
      <Banner {...args} layout="vertical" />
      <Banner {...args} layout="vertical" border="bottom" />
    </div>
  ),
};

export const NegativeStory: Story = {
  args: {
    description: 'An error has occurred',
    variant: 'negative',
    onClose: fn,
    action: (
      <Button variant="text" size="text">
        Action
      </Button>
    ),
  },
  render: (args) => (
    <div className="flex flex-col gap-md">
      <Banner {...args} layout="horizontal" />
      <Banner {...args} layout="horizontal" border="bottom" />
      <Banner {...args} layout="vertical" />
      <Banner {...args} layout="vertical" border="bottom" />
    </div>
  ),
};
