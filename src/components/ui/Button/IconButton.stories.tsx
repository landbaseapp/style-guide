import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconButton, IconButtonProps } from './IconButton';
import { CaretLeft } from '@phosphor-icons/react';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'ghost', 'accent', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'xs'] },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    variant: 'primary',
    icon: CaretLeft,
  },
} satisfies Meta<IconButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconButtonStory: Story = {
  render: (args) => (
    <div className="space-y-1">
      <h3 className="text-sm font-medium leading-none">IconButton</h3>
      <p className="text-sm text-muted-foreground">
        A button component that displays only an icon. Changes appearance on different states as
        disabled, active, hover, and focus.
      </p>
      {['primary', 'ghost', 'accent', 'danger'].map((variant) => (
        <div key={variant} className="flex gap-2 justify-center">
          <IconButton key={variant} {...args} variant={variant as IconButtonProps['variant']} />
        </div>
      ))}
    </div>
  ),
};
