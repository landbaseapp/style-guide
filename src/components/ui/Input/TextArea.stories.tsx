import type { Meta, StoryObj } from '@storybook/react';
import { LabelTextarea, Textarea } from './Textarea';
import { Typography } from '../Typography/Typography';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    description:
      'A text area component that allows users to input multiple lines of text. It follows the same styling as the Input component but expands vertically to accommodate more content.',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    placeholder: 'Enter text...',
    disabled: false,
    error: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputStory: Story = {};

export const ComplexStory: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <Typography variant="label-large">
          Textarea take any props a normal <code>&lt;textarea&gt;</code> takes. For example you can
          add <code>rows</code>, <code>minLength</code>, <code>maxLength</code>,{' '}
          <code>onChange</code>, etc
        </Typography>

        <LabelTextarea
          label="Textarea with rows={10}"
          rows={10}
          placeholder="Enter text..."
          disabled={false}
          error={false}
        />
        <LabelTextarea
          label="Textarea with minLength={1} and maxLength={20}"
          minLength={1}
          maxLength={5}
          placeholder="Enter text..."
          disabled={false}
          error={false}
        />
        <LabelTextarea
          label="Textarea with fixed height via resize-none"
          enableResize={false}
          rows={10}
          placeholder="Enter text..."
          disabled={false}
          error={false}
        />
      </div>
    );
  },
};
