import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from './PasswordInput';
import { useState } from 'react';

const meta = {
  title: 'Components/Input/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Password input field with toggle visibility and dynamic clear button positioning.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    value: {
      control: 'text',
      description: 'Input value (controls clear button visibility)',
    },
    error: {
      control: 'boolean',
      description: 'Error state of the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state of the input',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledPasswordInput = () => {
  const [value, setValue] = useState('');
  return (
    <PasswordInput
      label="Password"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type for testing"
    />
  );
};

export const Interactive: Story = {
  render: () => <ControlledPasswordInput />,
  args: {
    label: 'Password',
  },
};

export const Empty: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Password',
    value: 'mySecretPassword123',
    placeholder: 'Enter your password',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    value: '',
    error: true,
    errorMessage: 'Password is required',
    placeholder: 'Enter your password',
  },
};

export const WithValueAndError: Story = {
  args: {
    label: 'Password',
    value: 'weak',
    error: true,
    errorMessage: 'Password must be at least 8 characters',
    placeholder: 'Enter your password',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Password',
    value: 'mySecretPassword123',
    disabled: true,
    placeholder: 'Enter your password',
  },
};
