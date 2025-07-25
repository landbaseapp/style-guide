import { useState } from 'react';
import { LabelInput } from './Input';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/LabelInput',
  component: LabelInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
} satisfies Meta<typeof LabelInput>;

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
      return <LabelInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
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
