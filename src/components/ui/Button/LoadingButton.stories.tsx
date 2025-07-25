import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { LoadingButton, LoadingButtonProps } from './LoadingButton';
import { useState } from 'react';

const meta = {
  title: 'Components/LoadingButton',
  component: LoadingButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'accent', 'danger', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    onClick: fn(),
    children: 'Loading Button',
    variant: 'primary',
  },
} satisfies Meta<LoadingButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {
  render: (args) => (
    <div className="space-y-1">
      <h4 className="text-sm font-medium leading-none">Loading Button</h4>
      <p className="text-sm text-muted-foreground">
        A loading button displays a spinner while maintaining the button’s shape and position.
        prevents multiple clicks during async operations and provides visual feedback.
      </p>
      <div className="flex gap-3 m-[20px]">
        {['primary', 'accent', 'outline', 'ghost', 'danger'].map((mode) => (
          <LoadingButton
            key={mode}
            {...args}
            loading
            variant={mode as LoadingButtonProps['variant']}
          />
        ))}
      </div>
    </div>
  ),
};

export const LoadingButtonStory: Story = {
  render: (args) => {
    const Button = () => {
      const [loading, setLoading] = useState(false);
      return (
        <LoadingButton
          {...args}
          loading={loading}
          onClick={() => {
            alert('clicked');
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }}
        >
          Loading Button
        </LoadingButton>
      );
    };

    return <Button />;
  },
};
