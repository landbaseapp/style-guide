import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, ButtonProps } from './Button';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'accent', 'danger', 'ghost', 'outline', 'text'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'text'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    children: 'Button',
    variant: 'primary',
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonStory: Story = {
  render: (args) => (
    <div className="space-y-1">
      <h4 className="text-sm font-medium leading-none">Button</h4>
      <p className="text-sm text-muted-foreground">
        A clickable element that triggers an action or event with different styles for hover,
        disabled, focused, and active states.
      </p>
      <div className="flex flex-col gap-3 m-[20px]">
        {(['primary', 'accent', 'outline', 'ghost', 'danger'] as const).map((variant) => (
          <div key={variant} className="flex gap-2 justify-center">
            <Button {...args} leftIcon={CaretLeft} variant={variant}>
              {variant}
            </Button>
            <Button {...args} variant={variant}>
              {variant}
            </Button>
            <Button {...args} rightIcon={CaretRight} variant={variant}>
              {variant}
            </Button>
          </div>
        ))}
        <div className="flex gap-2 justify-center">
          <Button size="text" variant="text" leftIcon={CaretLeft}>
            Text
          </Button>
          <Button size="text" variant="text">
            Text
          </Button>
          <Button size="text" variant="text" rightIcon={CaretRight}>
            Text
          </Button>
        </div>
      </div>
    </div>
  ),
};
