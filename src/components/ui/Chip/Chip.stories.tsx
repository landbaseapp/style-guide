import type { Meta, StoryObj } from '@storybook/react';
import { RemoveChip } from './Chip';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof RemoveChip> = {
  title: 'Components/Chip',
  component: RemoveChip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm'],
      description: 'The size of the chip',
    },
    variant: {
      control: 'select',
      options: ['default'],
      description: 'The variant of the chip',
    },
    label: {
      control: 'text',
      description: 'The text content of the chip',
    },
    onClick: {
      description: 'Function called when the remove button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RemoveChip>;

export const Default: Story = {
  args: {
    label: 'Chip Label',
    onClick: action('chip-removed'),
  },
};

export const LongLabel: Story = {
  args: {
    label: 'This is a chip with a very long label',
    onClick: action('chip-removed'),
  },
};

export const ShortLabel: Story = {
  args: {
    label: 'Tag',
    onClick: action('chip-removed'),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Tag',
    onClick: action('chip-removed'),
    disabled: true,
  },
};
