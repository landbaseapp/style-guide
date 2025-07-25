import type { Meta, StoryObj } from '@storybook/react';
import { BadgeGroup } from './BadgeGroup';

const meta = {
  title: 'Composite-UI/BadgeGroup',
  component: BadgeGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BadgeGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    values: ['Badge 1', 'Badge 2', 'Badge 3'],
  },
  render: (args) => (
    <div className="w-[200px]">
      <BadgeGroup {...args} />
    </div>
  ),
};

export const ManyBadges: Story = {
  args: {
    values: [
      'CEO',
      'CTO',
      'CFO',
      'COO',
      'Founder',
      'Co - founder',
      'VP of Sales',
      'VP of Marketing',
      'VP of Product',
      'Head of Growth',
    ],
  },
  render: (args) => (
    <div className="w-[200px]">
      <BadgeGroup {...args} />
    </div>
  ),
};

export const SingleBadge: Story = {
  args: { values: ['Single Badge'] },
  render: (args) => (
    <div className="w-[200px]">
      <BadgeGroup {...args} />
    </div>
  ),
};

export const Empty: Story = {
  args: { values: [] },
  render: (args) => (
    <div className="w-[200px]">
      <BadgeGroup {...args} />
    </div>
  ),
};
