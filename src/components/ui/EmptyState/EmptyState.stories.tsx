import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { ReactComponent as NoIcpr } from 'src/assets/image/no-icpr.svg';
import { MagnifyingGlass } from '@phosphor-icons/react';

const meta: Meta<typeof EmptyState> = {
  title: 'Composite-UI/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    graphic: <NoIcpr />,
    title: "We don't have any ICP ready yet",
    description: 'We will notify you when we have prepared new ICPs for your approval.',
  },
};

export const WithCTA: Story = {
  args: {
    graphic: <NoIcpr />,
    title: 'You must complete your company profile',
    description:
      'Your company profile seems to be missing some information, please fill in the required information.',
    ctaButton: {
      label: 'Complete business profile',
      onClick: () => alert('Button clicked'),
    },
  },
};

export const WithIconCTA: Story = {
  args: {
    graphic: <NoIcpr />,
    title: 'No results found',
    description: 'Try adjusting your search parameters',
    ctaButton: {
      label: 'Search again',
      icon: MagnifyingGlass,
      onClick: () => alert('Button clicked'),
    },
  },
};
