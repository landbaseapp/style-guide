import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import { Star } from '@phosphor-icons/react';
import { AiActionIcon, AITagActionFinished } from '../Icon/AiIcons';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'loading', 'success'],
      description: 'The variant of the Tag',
    },
    label: {
      control: 'text',
      description: 'The text content of the Tag',
    },
    onClick: {
      description: 'Function called when the Tag is clicked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the Tag is disabled',
    },
    leftIcon: {
      description: 'Optional icon to display before the label',
    },
    rightIcon: {
      description: 'Optional icon to display after the label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    label: 'Tag Label',
    onClick: () => alert('Tag-clicked'),
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Tag with Icon',
    variant: 'default',
    onClick: () => alert('Tag-clicked'),
    leftIcon: Star,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Tag',
    onClick: () => alert('Tag-clicked'),
    disabled: true,
  },
};

export const AITag: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        <Tag
          onClick={() => alert('Tag-clicked')}
          rightIcon={AiActionIcon}
          label="AI Tag"
          variant="outline"
        />
        <Tag onClick={() => alert('Tag-clicked')} label="Generating..." variant="loading" />
        <Tag
          onClick={() => alert('Tag-clicked')}
          rightIcon={AITagActionFinished}
          label="AI Tag"
          variant="positive"
        />
      </div>
    );
  },
};
