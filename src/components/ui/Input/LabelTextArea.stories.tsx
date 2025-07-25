import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LabelTextarea } from './Textarea';

const meta = {
  title: 'Components/LabelTextArea',
  component: LabelTextarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
} satisfies Meta<typeof LabelTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
  },
  render: (args) => {
    const InteractiveLabelInput = () => {
      const [value, setValue] = useState('');
      return <LabelTextarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
    };
    return <InteractiveLabelInput />;
  },
};

export const WithValue: Story = {
  args: {
    label: 'Label',
    value: 'Input value',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    value: 'Cannot edit this',
  },
};

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    error: true,
    errorMessage: 'This field has an error',
    value: 'Invalid input',
  },
};
